import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const BlogEditor = ({ onSave }) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState(null);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      onSave({
        title,
        metaDescription,
        slug,
        content,
        image
      });
    }
  };

  return (
    <div className="blog-editor-container">
      <h2>Create New Blog Post</h2>
      
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

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Main blog title"
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
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic underline strikethrough | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | link image | \
                      removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6 } \
                           h1 { font-size: 2.2em } \
                           h2 { font-size: 1.8em } \
                           h3 { font-size: 1.4em }',
            images_upload_handler: async (blobInfo, progress) => {
              // You would implement your own image upload logic here
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(`https://example.com/${blobInfo.filename()}`);
                }, 2000);
              });
            }
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