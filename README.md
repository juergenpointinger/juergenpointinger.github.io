# Jekyll

Install Ruby and [Jekyll](https://jekyllrb.com/docs/installation/) first.

```sh
$ winget install -e --id RubyInstallerTeam.RubyWithDevKit.3.2
$ gem install jekyll bundler
$ bundle install
```

### Run Jekyll local

```sh
$ bundle exec jekyll clean
$ bundle exec jekyll build
$ bundle exec jekyll serve --drafts
  ...
  Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```