# Wagtail shortcode

Wagtail shortcode adds a custom Draftail enitity to provide a custom linktype ("shortcode"), giving you the ability to assign values in a similar way to normal links as well as decide how they should be rendered on the page.

[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD--3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![PyPI version](https://badge.fury.io/py/wagtail-shortcode.svg)](https://badge.fury.io/py/wagtail-shortcode)
[![shortcode CI](https://github.com/Morsey187/wagtail-shortcode/actions/workflows/test.yml/badge.svg)](https://github.com/Morsey187/wagtail-shortcode/actions/workflows/test.yml)


## Installation

- `python -m pip install wagtail-shortcode`
- ...


Add `'wagtail_shortcode'` to `INSTALLED_APPS`.

Register a [LinkHandler](https://docs.wagtail.org/en/stable/extending/rich_text_internals.html#rewrite-handlers), to control how the new linktype renders on the front-end (`|richtext` filter).

LinkHandlers must be registered within a wagtail_hooks.py file under an app directory and use an identifier matching `SHORTCODE_ANCHOR_TARGET_IDENTIFIER`, for example:

```python
# ./utils_app/wwgtail_hooks.py
from django.utils.html import escape
from wagtail import hooks
from wagtail.rich_text import LinkHandler
from wagtail_shortcode.handlers import SHORTCODE_ANCHOR_TARGET_IDENTIFIER


class CustomShortcodeLinkHandler(LinkHandler):
    identifier = SHORTCODE_ANCHOR_TARGET_IDENTIFIER

    @classmethod
    def expand_db_attributes(cls, attrs):
        href = attrs["shortcode"]
        # Do something clever
        return '<a href="%s">' % escape(href)


@hooks.register("register_rich_text_features")
def register_shortcode_link(features):
    features.register_link_type(CustomShortcodeLinkHandler)
```

Add `shortcode` to the `features` argument of any rich text field where you have overridden the default feature list:

```python
class Header(models.Model):
    content = RichTextField(
        features=["shortcode", "h2", "h3", "bold", "italic", "link"]
    )
```


## Configuration

### Updating the window prompt's help-text

When adding shortcode within the editor, a window prompt will appear, the text within this prompt can be customised by providing a value for `SHORTCODE_HELP_TEXT` within your project's settings file. This can be helpful as to inform editors of the expected behaviour of your custom LinkHandler.

`SHORTCODE_HELP_TEXT="Enter a shortcode value"`

The window.prompt function is a JavaScript method which supports basic text formatting using special characters, as such a newline character can be included using `\n` if needed.


## Contributing

[See docs](./CONTRIBUTING.md).
