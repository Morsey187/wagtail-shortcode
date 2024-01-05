# Contributing

## Install

To make changes to this project, first clone this repository:

```sh
git clone https://github.com/Morsey187/wagtail-shortcode.git
cd wagtail-shortcode
```

With your preferred virtualenv activated, install testing dependencies:

### Using pip

```sh
python -m pip install --upgrade pip>=21.3
python -m pip install -e '.[testing]' -U
```

### Using flit

```sh
python -m pip install flit
flit install
```

## pre-commit

Note that this project uses [pre-commit](https://github.com/pre-commit/pre-commit).
It is included in the project testing requirements. To set up locally:

```shell
# go to the project directory
$ cd wagtail-shortcode
# initialize pre-commit
$ pre-commit install

# Optional, run all checks once for this, then the checks will run only on the changed files
$ git ls-files --others --cached --exclude-standard | xargs pre-commit run --files
```

## How to run tests

Now you can run tests as shown below:

```sh
tox
```

or, you can run them for a specific environment `tox -e python3.11-django4.2-wagtail5.1` or specific test
`tox -e python3.11-django4.2-wagtail5.1-sqlite wagtail-shortcode.tests.test_file.TestClass.test_method`

To run the test app interactively, use `tox -e interactive`, visit `http://127.0.0.1:8020/admin/` and log in with `admin`/`changeme`.

## Tips on working with the package locally

Tox is set to use python 3.11 as the default enviroment (`basepython`), so running the project using python 3.11 will likely be easier.

As well as using `tox -e interactive`, the test project can also be ran using `python ./testmanage.py runserver 0:8000`

`flit install -s` installs the package in development mode, and can sometimes resolve issues.

You can re-create a tox enviroment using the `--recreate` argument, this can be handy when wanting to update enviroments with any package changes.

`tox -e python3.11-django4.2-wagtail5.2-sqlite-llm --recreate`
