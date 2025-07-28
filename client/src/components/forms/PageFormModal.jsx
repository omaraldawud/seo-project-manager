import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function PageFormModal({ page, onClose, onSuccess, projects }) {
  const [form, setForm] = useState({
    url: "",
    title: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    h1: "",
    h2s: [],
    keywords: [],
    projectId: "",
  });

  const [h2Input, setH2Input] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (page) {
      setForm({
        url: page.url || "",
        title: page.title || "",
        metaTitle: page.metaTitle || "",
        metaDescription: page.metaDescription || "",
        metaKeywords: page.metaKeywords || "",
        h1: page.h1 || "",
        h2s: page.h2s || [],
        keywords: page.keywords || [],
        projectId:
          typeof page.projectId === "object"
            ? page.projectId._id
            : page.projectId || "",
      });
    }
  }, [page]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addH2 = () => {
    if (h2Input.trim()) {
      setForm({ ...form, h2s: [...form.h2s, h2Input.trim()] });
      setH2Input("");
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      setForm({ ...form, keywords: [...form.keywords, keywordInput.trim()] });
      setKeywordInput("");
    }
  };

  const removeH2 = (index) => {
    const updated = [...form.h2s];
    updated.splice(index, 1);
    setForm({ ...form, h2s: updated });
  };

  const removeKeyword = (index) => {
    const updated = [...form.keywords];
    updated.splice(index, 1);
    setForm({ ...form, keywords: updated });
  };

  const handleSubmit = async () => {
    try {
      if (page) {
        await axios.put(`/api/pages/${page._id}`, form);
        toast.success("Page updated");
      } else {
        await axios.post("/api/pages", form);
        toast.success("Page created");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Failed to save page");
    }
  };

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{page ? "Edit Page" : "Add Page"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Project</Form.Label>
            <Form.Select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Project --</option>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>
                  {proj.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://example.com/page"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Meta Title</Form.Label>
            <Form.Control
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              as="textarea"
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Meta Keywords</Form.Label>
            <Form.Control
              name="metaKeywords"
              value={form.metaKeywords}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>H1</Form.Label>
            <Form.Control name="h1" value={form.h1} onChange={handleChange} />
          </Form.Group>

          {/* H2s */}
          <Form.Group className="mt-3">
            <Form.Label>H2s</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                value={h2Input}
                onChange={(e) => setH2Input(e.target.value)}
                placeholder="Add H2"
              />
              <Button variant="secondary" onClick={addH2}>
                Add
              </Button>
            </div>
            <div className="mt-2 d-flex flex-wrap gap-2">
              {form.h2s.map((h, i) => (
                <span
                  key={i}
                  className="badge bg-secondary"
                  onClick={() => removeH2(i)}
                  style={{ cursor: "pointer" }}
                >
                  {h} &times;
                </span>
              ))}
            </div>
          </Form.Group>

          {/* Keywords */}
          <Form.Group className="mt-3">
            <Form.Label>Keywords</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Add keyword"
              />
              <Button variant="secondary" onClick={addKeyword}>
                Add
              </Button>
            </div>
            <div className="mt-2 d-flex flex-wrap gap-2">
              {form.keywords.map((k, i) => (
                <span
                  key={i}
                  className="badge bg-info text-dark"
                  onClick={() => removeKeyword(i)}
                  style={{ cursor: "pointer" }}
                >
                  {k} &times;
                </span>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>{page ? "Update" : "Create"}</Button>
      </Modal.Footer>
    </Modal>
  );
}
