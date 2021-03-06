---
name: '태그별모음'
linkTitle: 'bytag'
pageOrder: 3
layout: 'page'
url: './bytag.html'
---

rowmap = (row, orig) ->
  ret = []

  tagnames = []
  for own tag of orig
    tagnames.push tag
  tagnames.sort()

  for tag, i in tagnames
    ret.push(cur = []) if i % row is 0
    cur.push tag

  ret

cellular = rowmap 3, @tags.store()

###
style rel: 'stylesheet', media: 'screen, projection', scoped: 'scoped', ->
  """
  #tagmap {
    margin-left: 10px;
  }
  .row > [class*="span"] {
    margin-left: 10px;
  }
  """

h1 'Tagmap'
###

section_cnt = 0
section ".tagmap", ->
  for row in cellular
    div '#tagmap.row', ->
      for cell in row
        tag = @tags.store( cell )
        if tag.name isnt 'post'
          section_cnt = section_cnt + 1
          div "##{cell}.span4", ->
            div ".lists.group", ->
              header tag.name
              ul ".lists-con", ->
                tag.documents.forEach (documentModel)->
                  li -> a href: "."+"#{documentModel.get('url')}"+".html", "#{documentModel.get('title')}"

  if section_cnt is 0
    div ".span12.main-box.media", ->
      div ".media-body", ->
        h4 ".media-heading", -> "There is no document !"
