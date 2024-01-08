from django.conf import settings
from django.utils.html import json_script
from django.utils.safestring import mark_safe
from wagtail import hooks
from wagtail.admin.rich_text.editors.draftail import features as draftail_features

from wagtail_shortcode.handlers import (
    ShortcodeEntityElementHandler,
    shortcode_entity_decorator,
)


@hooks.register("register_rich_text_features")
def register_shortcode_feature(features):
    features.default_features.append("shortcode")
    """
    Registering the `shortcode` feature, which uses the `SHORTCODE` Draft.js entity type,
    and is stored as a unique anchor `<a linktype="shortcode" shortcode="shortcode-value">` tag (see shortcode_entity_decorator),
    and rendered via a LinkHandler with a matching identifier (the identifier being linktype="shortcode").
    """
    feature_name = "shortcode"
    type_ = "SHORTCODE"

    control = {
        "type": type_,
        "label": "SCL",
        "description": "Shortcode link",
    }

    features.register_editor_plugin(
        "draftail",
        feature_name,
        draftail_features.EntityFeature(
            control, js=["wagtail_shortcode/js/wagtail-shortcode.js"]
        ),
    )

    features.register_converter_rule(
        "contentstate",
        feature_name,
        {
            "from_database_format": {
                'a[linktype="shortcode"]': ShortcodeEntityElementHandler(type_)
            },
            "to_database_format": {
                "entity_decorators": {type_: shortcode_entity_decorator}
            },
        },
    )


@hooks.register("insert_editor_js")
def shortcode_editor_js():
    """
    Use json_script to pass help-text to the admin front-end.

    Note:
    - Ensure this matches the type WagtailShortcodeConfig and getShortcodeConfig's
      querySelector in main.tsx.
    - This will output something similar to the following on the admin front-end:
      <script id="wagtail-shortcode-config" type="application/json">{"helpText": "Add a shortcode link"}</script>
    """
    default_help_text = "Add a Short Code Link"

    help_text = getattr(settings, "SHORTCODE_HELP_TEXT", default_help_text)

    wagtail_ai_config = json_script(
        {
            "helpText": help_text,
        },
        "wagtail-shortcode-config",
    )

    return mark_safe(wagtail_ai_config)
