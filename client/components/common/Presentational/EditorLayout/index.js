function EditorLayout() {

  const renderEditor = () => {
    const { editorData } = this.state;
    // console.log(editorData);
    return (
      <div>
        <textarea
          id="textarea1"
          class="input shadow"
          name="editorData"
          rows="15"
          cols="100"
          // onKeyUp={this.handleEditorData}
          placeholder="Your text here "
          onChange={this.handleInputChange}
          value={editorData}
        ></textarea>
      </div>
    );
  }
    return (
        renderEditor()
    );
  }