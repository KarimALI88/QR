import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogEditor = ({ onSave }) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      onSave({
        title,
        metaDescription,
        slug,
        content,
        image,
      });
    }
  };

  return (
    <div className="blog-editor-container">
      {/* SEO Fields */}
      <div className="seo-fields">
        <div className="form-group">
          <label>Title/Headline (H1)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Main blog title"
          />
        </div>

        <div className="form-group">
          <label>Meta Description</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Brief description for search engines (150-160 chars)"
            maxLength={160}
          />
          <small>{metaDescription.length}/160 characters</small>
        </div>

        <div className="form-group">
          <label>URL Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="custom-url-slug"
          />
        </div>
      </div>

      {/* TinyMCE Editor */}
      <div className="editor-wrapper">
        <Editor
          apiKey="jzeg9x5bultwhiofyti62lr5p6o613guiqus76tqzdm2ji9k" // Replace with your actual API key
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Start writing your amazing blog content here...</p>"
          init={{
            plugins: [
              // Core editing features
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Jun 3, 2025:
              "checklist",
              "mediaembed",
              "casechange",
              "formatpainter",
              "pageembed",
              "a11ychecker",
              "tinymcespellchecker",
              "permanentpen",
              "powerpaste",
              "advtable",
              "advcode",
              "editimage",
              "advtemplate",
              "ai",
              "mentions",
              "tinycomments",
              "tableofcontents",
              "footnotes",
              "mergetags",
              "autocorrect",
              "typography",
              "inlinecss",
              "markdown",
              "importword",
              "exportword",
              "exportpdf",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        Publish Blog Post
      </button>
    </div>
  );
};

export default BlogEditor;
