import React from 'react';

const { RichUtils } = window.DraftJS;
const { TooltipEntity } = window.draftail;
const { Icon } = window.wagtail.components;

type WagtailShortcodeConfig = {
  helpText: string;
};

const getShortcodeConfig = (): WagtailShortcodeConfig => {
  // eslint-disable-next-line no-undef
  const configurationElement = document.querySelector<HTMLScriptElement>(
    '#wagtail-shortcode-config',
  );
  if (!configurationElement || !configurationElement.textContent) {
    throw new Error('No wagtail-shortcode configuration found.');
  }

  try {
    return JSON.parse(configurationElement.textContent);
  } catch (err) {
    throw new SyntaxError(
      `Error parsing wagtail-shortcode configuration: ${err.message}`,
    );
  }
};

/** Responsible for creating new entity instances in the editor. */
class ShortcodeSource extends window.React.Component {
  componentDidMount() {
    const { editorState, entityType, entity, entityKey, onComplete }: any =
      this.props;

    const content = editorState.getCurrentContent();

    let defaultValue;

    if (entity && entityKey) {
      // If an existing entity get the shortcode value to provide as default
      const { shortcode } = entity.getData();
      defaultValue = shortcode;
    }

    const { helpText } = getShortcodeConfig();

    // eslint-disable-next-line no-alert
    const shortcodeValue = window.prompt(helpText, defaultValue);

    // Uses the Draft.js API to create a new entity passing in the shortcode value.
    if (shortcodeValue) {
      const contentWithEntity = content.createEntity(
        entityType.type,
        'MUTABLE',
        {
          shortcode: shortcodeValue,
        },
      );
      const lastCreatedEntityKey = contentWithEntity.getLastCreatedEntityKey();
      const selection = editorState.getSelection();
      const nextState = RichUtils.toggleLink(
        editorState,
        selection,
        lastCreatedEntityKey,
      );

      onComplete(nextState);
    } else {
      onComplete(editorState);
    }
  }

  render() {
    return null;
  }
}

const getAnchorIdentifierAttributes = (data: any) => {
  const value = data.shortcode || null;
  const icon = <Icon name="link" />; // TODO confirm inline icon used in editor (requried)

  return {
    url: value,
    icon,
    label: value,
  };
};

/** Responsible for displaying entity instances within the editor. */
const Shortcode: React.FC<any> = (props: any): React.ReactElement<any, any> => {
  const { entityKey, contentState } = props;
  const data = contentState.getEntity(entityKey).getData();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TooltipEntity {...props} {...getAnchorIdentifierAttributes(data)} />;
};

/** Register the plugin directly on script execution so the editor loads it when initialising. */
window.draftail.registerPlugin(
  {
    type: 'SHORTCODE',
    source: ShortcodeSource,
    decorator: Shortcode,
  },
  'entityTypes',
);
