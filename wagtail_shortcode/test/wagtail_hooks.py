from django.utils.html import escape
from wagtail import hooks
from wagtail.rich_text import LinkHandler

from wagtail_shortcode.handlers import SHORTCODE_ANCHOR_TARGET_IDENTIFIER


class ShortIdentifierLinkHandler(LinkHandler):
    identifier = SHORTCODE_ANCHOR_TARGET_IDENTIFIER

    @classmethod
    def expand_db_attributes(cls, attrs):
        href = attrs["href"]
        return '<a href="%s" linktype="shortcode">' % escape(href)


@hooks.register("register_rich_text_features")
def register_shortcode_link(features):
    """
    Register the shortcode link type to handle how shortcode links render on the page.
    Without registering a LinkHandler Wagtail's LinkRewriter will return a blank anchor tag.
    """

    features.register_link_type(ShortIdentifierLinkHandler)
