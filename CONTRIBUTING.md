# Contributing to shortcode

## Tips on working with the package locally

Tox is set to use python 3.11 as the default enviroment (`basepython`), so running the project using python 3.11 will likely be easier.

As well as using `tox -e interactive`, the test project can also be ran using `python ./testmanage.py runserver 0:8000`

`flit install -s` installs the package in development mode, and can sometimes resolve issues.

You can re-create a tox enviroment using the `--recreate` argument, this can be handy when wanting to update enviroments with any package changes.

`tox -e python3.11-django4.2-wagtail5.2-sqlite-llm --recreate`
