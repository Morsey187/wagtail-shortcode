from draftjs_exporter.dom import DOM
from wagtail.admin.rich_text.converters.html_to_contentstate import (
    InlineEntityElementHandler,
)


SHORTCODE_ANCHOR_TARGET_IDENTIFIER = "shortcode"  # Used for linktype attribute


def shortcode_entity_decorator(props):
    """
    Draft.js ContentState to database HTML.
    Converts the SHORTCODE entities into a anchor tag, which will then
    be further altered by a custom LinkHandler.
    """
    return DOM.create_element(
        "a",
        {
            "shortcode": props.get("shortcode"),
            "linktype": SHORTCODE_ANCHOR_TARGET_IDENTIFIER,
        },
        props["children"],
    )


class ShortcodeEntityElementHandler(InlineEntityElementHandler):
    """
    Database HTML to Draft.js ContentState.
    Converts the anchor tag into a shortcode entity, with the right data.
    """

    mutability = "IMMUTABLE"

    def get_attribute_data(self, attrs):
        return {
            "shortcode": attrs.get("shortcode"),
            "linktype": SHORTCODE_ANCHOR_TARGET_IDENTIFIER,
        }
