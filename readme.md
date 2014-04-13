# opml-to-markdown

Convert OPML(Outline) to Markdown

Use Case

* [OmniOutliner](http://www.omnigroup.com/omnioutliner "OmniOutliner")'s opml -> Markdown -> [cleaver](https://github.com/jdan/cleaver "cleaver")'s slide.

## Installation

``` sh
npm install opml-to-markdown -g
```

## Usage

``` sh
$ opml-to-markdown -h
Usage: cmd [options]

  -h, --help            displays help
  -e, --entry String    opml file path
  -o, --outfile String  output to file path
  --require String      builder module(like build-markdown.js) path
```

``` sh
$ opml-to-markdown test/fixtures/header-list-note/test.opml
```

``` xml
<?xml version="1.0" encoding="utf-8"?>
<opml version="1.0">
  <head>
    <title>title</title>
    <expansionState>0,2</expansionState>
  </head>
  <body>
    <outline text="H1">
      <outline text="H2 Text"/>
      <outline text="H2">
        <outline text="text"/>
      </outline>
    </outline>
    <outline text="H1 text" _note="note\nnote"/>
  </body>
</opml>
```

to

```markdown
title: title
--

# H1

- H2 Text
- H2
    - text

--

# H1 text

note
note
```


## Custom output markdown

You have to implement building module.

``` sh
$ opml-to-markdown -e test/fixtures/header-list-note/test.opml --require lib/build-markdown.js
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT