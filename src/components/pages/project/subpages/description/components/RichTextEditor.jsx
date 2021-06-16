import React from 'react'
import { EditorState } from 'draft-js'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor'
import createToolbarPlugin from '@draft-js-plugins/static-toolbar'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton
} from '@draft-js-plugins/buttons'
import '@draft-js-plugins/static-toolbar/lib/plugin.css'

export default class RichTextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.toolbarPlugin = createToolbarPlugin()
    this.plugins = [this.toolbarPlugin]
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    const { Toolbar } = this.toolbarPlugin

    return (
      <>
        {this.props.canEdit && (
          <div className="w-full flex justify-end b-bottom-light p-4 mb-2">
            {this.props.isEditing ? (
              <div className="w-full flex justify-between">
                <Toolbar>
                  {externalProps => (
                    <div className="flex">
                      {console.log(externalProps)}
                      <BoldButton {...externalProps} />
                      <ItalicButton {...externalProps} />
                      <UnderlineButton {...externalProps} />
                      <HeadlineOneButton {...externalProps} />
                      <HeadlineTwoButton {...externalProps} />
                      <HeadlineThreeButton {...externalProps} />
                      <UnorderedListButton {...externalProps} />
                      <OrderedListButton {...externalProps} />
                      <BlockquoteButton {...externalProps} />
                    </div>
                  )}
                </Toolbar>
                <button
                  className="btn-primary btn-sm"
                  onClick={this.props.handleSubmit}
                >
                  Confirmar
                </button>
              </div>
            ) : (
              <button
                className="btn-primary btn-sm"
                onClick={() => this.props.setIsEditing(true)}
              >
                Editar
              </button>
            )}
          </div>
        )}
        <div
          className={`w-full p-4 ${
            this.props.isEditing ? 'color-headline' : ''
          }`}
          onClick={this.focus}
        >
          <Editor
            ref={element => (this.editor = element)}
            plugins={this.plugins}
            editorState={this.props.editorState}
            readOnly={!this.props.isEditing}
            onChange={this.props.setEditorState}
          />
        </div>
      </>
    )
  }
}
