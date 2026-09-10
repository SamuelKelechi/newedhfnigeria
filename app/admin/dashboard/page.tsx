"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  Plus,
  LogOut,
  FileText,
  Clock,
  MapPin,
  Pencil,
  Trash2,
  ChevronRight,
  X,
  Save,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo2,
  Redo2,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import "./admin-dashboard.css";

type ActiveSection = "blog" | "events";

type Blog = {
  id: string;
  title: string;
  image: string;
  description: string;
  story: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

type Event = {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  createdAt: string;
  updatedAt: string;
};

type BlogForm = {
  title: string;
  image: string;
  description: string;
  story: string;
  date: string;
};

type EventForm = {
  title: string;
  image: string;
  date: string;
  time: string;
  venue: string;
};

const emptyBlogForm: BlogForm = {
  title: "",
  image: "",
  description: "",
  story: "",
  date: "",
};

const emptyEventForm: EventForm = {
  title: "",
  image: "",
  date: "",
  time: "",
  venue: "",
};

export default function AdminDashboard() {
  const router = useRouter();

  const [activeSection, setActiveSection] =
    useState<ActiveSection>("blog");

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const [editingBlogId, setEditingBlogId] =
    useState<string | null>(null);

  const [editingEventId, setEditingEventId] =
    useState<string | null>(null);

  const [blogForm, setBlogForm] =
    useState<BlogForm>(emptyBlogForm);

  const [eventForm, setEventForm] =
    useState<EventForm>(emptyEventForm);

  const [savingBlog, setSavingBlog] = useState(false);
  const [savingEvent, setSavingEvent] = useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  /*
  ==========================================================
  TIPTAP EDITOR
  ==========================================================
  */

  const storyEditor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],

    content: "",

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      updateBlogField("story", editor.getHTML());
    },
  });

  /*
  ==========================================================
  LOAD CONTENT
  ==========================================================
  */

  async function loadContent() {
    try {
      setLoading(true);
      setError("");

      const [blogsResponse, eventsResponse] =
        await Promise.all([
          fetch("/api/admin/blog"),
          fetch("/api/admin/event"),
        ]);

      if (!blogsResponse.ok) {
        throw new Error("Failed to load blogs.");
      }

      if (!eventsResponse.ok) {
        throw new Error("Failed to load events.");
      }

      const blogsData = await blogsResponse.json();
      const eventsData = await eventsResponse.json();

      setBlogs(blogsData);
      setEvents(eventsData);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load your content. Please refresh the page."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  /*
  ==========================================================
  LOGOUT
  ==========================================================
  */

  function handleLogout() {
    router.push("/admin");
  }

  /*
  ==========================================================
  BLOG FORM
  ==========================================================
  */

  function openCreateBlog() {
    setEditingBlogId(null);

    setBlogForm(emptyBlogForm);

    setError("");

    setShowBlogForm(true);
    setShowEventForm(false);

    if (storyEditor) {
      storyEditor.commands.clearContent();
    }
  }

  function openEditBlog(blog: Blog) {
    setEditingBlogId(blog.id);

    setBlogForm({
      title: blog.title,
      image: blog.image,
      description: blog.description,
      story: blog.story,
      date: formatDateForInput(blog.date),
    });

    setError("");

    setShowBlogForm(true);
    setShowEventForm(false);

    if (storyEditor) {
      storyEditor.commands.setContent(blog.story || "");
    }
  }

  function closeBlogForm() {
    setShowBlogForm(false);

    setEditingBlogId(null);

    setBlogForm(emptyBlogForm);

    if (storyEditor) {
      storyEditor.commands.clearContent();
    }
  }

  function updateBlogField(
    field: keyof BlogForm,
    value: string
  ) {
    setBlogForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleBlogSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!storyEditor) {
      setError("Story editor is not ready yet.");
      return;
    }

    const storyHTML = storyEditor.getHTML();

    if (
      storyHTML === "<p></p>" ||
      !storyEditor.getText().trim()
    ) {
      setError("Please enter the blog story.");
      return;
    }

    const finalBlogForm = {
      ...blogForm,
      story: storyHTML,
    };

    setSavingBlog(true);
    setError("");

    try {
      const url = editingBlogId
        ? `/api/admin/blog/${editingBlogId}`
        : "/api/admin/blog";

      const method = editingBlogId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalBlogForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save blog post."
        );
      }

      closeBlogForm();

      await loadContent();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save blog post."
      );
    } finally {
      setSavingBlog(false);
    }
  }

  /*
  ==========================================================
  EVENT FORM
  ==========================================================
  */

  function openCreateEvent() {
    setEditingEventId(null);

    setEventForm(emptyEventForm);

    setError("");

    setShowEventForm(true);
    setShowBlogForm(false);
  }

  function openEditEvent(event: Event) {
    setEditingEventId(event.id);

    setEventForm({
      title: event.title,
      image: event.image,
      date: formatDateForInput(event.date),
      time: event.time,
      venue: event.venue,
    });

    setError("");

    setShowEventForm(true);
    setShowBlogForm(false);
  }

  function closeEventForm() {
    setShowEventForm(false);

    setEditingEventId(null);

    setEventForm(emptyEventForm);
  }

  function updateEventField(
    field: keyof EventForm,
    value: string
  ) {
    setEventForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleEventSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSavingEvent(true);
    setError("");

    try {
      const url = editingEventId
        ? `/api/admin/event/${editingEventId}`
        : "/api/admin/event";

      const method = editingEventId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save event."
        );
      }

      closeEventForm();

      await loadContent();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save event."
      );
    } finally {
      setSavingEvent(false);
    }
  }

  /*
  ==========================================================
  DELETE BLOG
  ==========================================================
  */

  async function handleDeleteBlog(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `/api/admin/blog/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete blog."
        );
      }

      setBlogs((previous) =>
        previous.filter((blog) => blog.id !== id)
      );
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete blog."
      );
    } finally {
      setDeletingId(null);
    }
  }

  /*
  ==========================================================
  DELETE EVENT
  ==========================================================
  */

  async function handleDeleteEvent(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `/api/admin/event/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete event."
        );
      }

      setEvents((previous) =>
        previous.filter((event) => event.id !== id)
      );
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete event."
      );
    } finally {
      setDeletingId(null);
    }
  }

  /*
  ==========================================================
  ADD CONTENT
  ==========================================================
  */

  function handleAddContent() {
    if (activeSection === "blog") {
      openCreateBlog();
    } else {
      openCreateEvent();
    }
  }

  /*
  ==========================================================
  DATE FORMATTERS
  ==========================================================
  */

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  function formatDateForInput(date: string) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const year = parsedDate.getFullYear();

    const month = String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      parsedDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  /*
  ==========================================================
  TIPTAP LINK
  ==========================================================
  */

  function addLink() {
    if (!storyEditor) return;

    const previousUrl =
      storyEditor.getAttributes("link").href || "";

    const url = window.prompt(
      "Enter the URL",
      previousUrl
    );

    if (url === null) {
      return;
    }

    if (url === "") {
      storyEditor
        .chain()
        .focus()
        .unsetLink()
        .run();

      return;
    }

    storyEditor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }

  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (
    <main className="dashboardPage">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="dashboardSidebar">

        <div className="sidebarBrand">

          <div className="sidebarLogo">
            EDHF
          </div>

          <div className="sidebarBrandText">
            <strong>EDHF</strong>
            <span>Administrator</span>
          </div>

        </div>

        <div className="sidebarDivider"></div>

        <nav className="dashboardNavigation">

          <p className="navigationLabel">
            CONTENT MANAGEMENT
          </p>

          <button
            type="button"
            className={
              `navigationItem ${
                activeSection === "blog"
                  ? "navigationItemActive"
                  : ""
              }`
            }
            onClick={() => {
              setActiveSection("blog");
              closeBlogForm();
              closeEventForm();
            }}
          >

            <BookOpen size={20} />

            <span>
              Blog
            </span>

            <ChevronRight
              size={17}
              className="navigationArrow"
            />

          </button>

          <button
            type="button"
            className={
              `navigationItem ${
                activeSection === "events"
                  ? "navigationItemActive"
                  : ""
              }`
            }
            onClick={() => {
              setActiveSection("events");
              closeBlogForm();
              closeEventForm();
            }}
          >

            <CalendarDays size={20} />

            <span>
              Upcoming Events
            </span>

            <ChevronRight
              size={17}
              className="navigationArrow"
            />

          </button>

        </nav>

        <div className="sidebarBottom">

          <button
            type="button"
            className="logoutButton"
            onClick={handleLogout}
          >

            <LogOut size={19} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <section className="dashboardMain">

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="dashboardHeader">

          <div className="headerTitle">

            <div className="mobileDashboardIcon">
              <LayoutDashboard size={22} />
            </div>

            <div>

              <p className="headerEyebrow">
                ADMINISTRATION
              </p>

              <h1>
                Dashboard
              </h1>

            </div>

          </div>

          <div className="headerAdmin">

            <div className="adminAvatar">
              A
            </div>

            <div className="adminUserInfo">

              <strong>
                Administrator
              </strong>

              <span>
                EDHF Admin
              </span>

            </div>

          </div>

        </header>


        {/* ===================================================
            INTRO
        =================================================== */}

        <div className="dashboardIntro">

          <div>

            <h2>
              Welcome back
            </h2>

            <p>
              Manage your blog posts and upcoming events
              from one place.
            </p>

          </div>

          <button
            type="button"
            className="primaryAddButton"
            onClick={handleAddContent}
          >

            <Plus size={19} />

            <span>
              {activeSection === "blog"
                ? "Add New Blog"
                : "Add New Event"}
            </span>

          </button>

        </div>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="dashboardError">
            {error}
          </div>
        )}


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="statisticsGrid">

          <div className="statCard">

            <div className="statIcon statIconBlue">
              <BookOpen size={22} />
            </div>

            <div className="statInformation">

              <span className="statLabel">
                BLOG POSTS
              </span>

              <strong className="statNumber">
                {blogs.length}
              </strong>

              <span className="statDescription">
                Published posts
              </span>

            </div>

          </div>


          <div className="statCard">

            <div className="statIcon statIconGreen">
              <CalendarDays size={22} />
            </div>

            <div className="statInformation">

              <span className="statLabel">
                EVENTS
              </span>

              <strong className="statNumber">
                {events.length}
              </strong>

              <span className="statDescription">
                Upcoming events
              </span>

            </div>

          </div>


          <div className="statCard">

            <div className="statIcon statIconPurple">
              <FileText size={22} />
            </div>

            <div className="statInformation">

              <span className="statLabel">
                TOTAL CONTENT
              </span>

              <strong className="statNumber">
                {blogs.length + events.length}
              </strong>

              <span className="statDescription">
                Blog + events
              </span>

            </div>

          </div>

        </div>


        {/* ===================================================
            CONTENT MANAGEMENT
        =================================================== */}

        <section className="contentManagement">

          <div className="managementHeader">

            <div>

              <p className="managementEyebrow">
                CONTENT
              </p>

              <h2>
                {activeSection === "blog"
                  ? "Blog Posts"
                  : "Upcoming Events"}
              </h2>

            </div>

            <button
              type="button"
              className="secondaryAddButton"
              onClick={handleAddContent}
            >

              <Plus size={18} />

              <span>
                {activeSection === "blog"
                  ? "Add Blog"
                  : "Add Event"}
              </span>

            </button>

          </div>


          {/* =================================================
              TOGGLE
          ================================================= */}

          <div className="contentToggle">

            <button
              type="button"
              className={
                activeSection === "blog"
                  ? "toggleButton toggleButtonActive"
                  : "toggleButton"
              }
              onClick={() => {
                setActiveSection("blog");
                closeBlogForm();
                closeEventForm();
              }}
            >

              <BookOpen size={18} />

              <span>
                Blog
              </span>

            </button>

            <button
              type="button"
              className={
                activeSection === "events"
                  ? "toggleButton toggleButtonActive"
                  : "toggleButton"
              }
              onClick={() => {
                setActiveSection("events");
                closeBlogForm();
                closeEventForm();
              }}
            >

              <CalendarDays size={18} />

              <span>
                Upcoming Events
              </span>

            </button>

          </div>


          {/* =================================================
              BLOG FORM
          ================================================= */}

          {showBlogForm && (

            <div className="contentPanel formPanel">

              <div className="formPanelHeader">

                <div>

                  <p className="managementEyebrow">
                    {editingBlogId
                      ? "EDIT BLOG"
                      : "NEW BLOG"}
                  </p>

                  <h3>
                    {editingBlogId
                      ? "Update Blog Post"
                      : "Create Blog Post"}
                  </h3>

                </div>

                <button
                  type="button"
                  className="closeFormButton"
                  onClick={closeBlogForm}
                >
                  <X size={20} />
                </button>

              </div>


              <form
                className="contentForm"
                onSubmit={handleBlogSubmit}
              >

                {/* TITLE */}

                <div className="formField">

                  <label htmlFor="blog-title">
                    Title
                  </label>

                  <input
                    id="blog-title"
                    type="text"
                    value={blogForm.title}
                    onChange={(event) =>
                      updateBlogField(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="Enter blog title"
                    required
                  />

                </div>


                {/* IMAGE */}

                <div className="formField">

                  <label htmlFor="blog-image">
                    Image URL
                  </label>

                  <div className="inputWithIcon">

                    <ImageIcon size={18} />

                    <input
                      id="blog-image"
                      type="url"
                      value={blogForm.image}
                      onChange={(event) =>
                        updateBlogField(
                          "image",
                          event.target.value
                        )
                      }
                      placeholder="https://example.com/image.jpg"
                      required
                    />

                  </div>

                  <small>
                    Image upload will be connected next.
                  </small>

                </div>


                {/* DATE */}

                <div className="formField">

                  <label htmlFor="blog-date">
                    Date
                  </label>

                  <input
                    id="blog-date"
                    type="date"
                    value={blogForm.date}
                    onChange={(event) =>
                      updateBlogField(
                        "date",
                        event.target.value
                      )
                    }
                    required
                  />

                </div>


                {/* DESCRIPTION */}

                <div className="formField">

                  <label htmlFor="blog-description">
                    Description
                  </label>

                  <textarea
                    id="blog-description"
                    value={blogForm.description}
                    onChange={(event) =>
                      updateBlogField(
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Write a short description of the blog post..."
                    rows={2}
                    required
                  />

                </div>


                {/* =================================================
                    STORY EDITOR
                ================================================= */}

                <div className="formField">

                  <label>
                    Story
                  </label>

                  <div className="richTextEditor">

                    {/* TOOLBAR */}

                    <div className="richTextToolbar">

                      {/* BOLD */}

                      <button
                        type="button"
                        title="Bold"
                        className={
                          storyEditor?.isActive("bold")
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleBold()
                            .run()
                        }
                      >
                        <Bold size={17} />
                      </button>


                      {/* ITALIC */}

                      <button
                        type="button"
                        title="Italic"
                        className={
                          storyEditor?.isActive("italic")
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleItalic()
                            .run()
                        }
                      >
                        <Italic size={17} />
                      </button>


                      {/* UNDERLINE */}

                      <button
                        type="button"
                        title="Underline"
                        className={
                          storyEditor?.isActive("underline")
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                        }
                      >
                        <UnderlineIcon size={17} />
                      </button>


                      {/* STRIKETHROUGH */}

                      <button
                        type="button"
                        title="Strikethrough"
                        className={
                          storyEditor?.isActive("strike")
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleStrike()
                            .run()
                        }
                      >
                        <Strikethrough size={17} />
                      </button>


                      <span className="editorToolbarDivider" />


                      {/* HEADING 2 */}

                      <button
                        type="button"
                        title="Heading 2"
                        className={
                          storyEditor?.isActive(
                            "heading",
                            { level: 2 }
                          )
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleHeading({
                              level: 2,
                            })
                            .run()
                        }
                      >
                        <Heading2 size={18} />
                      </button>


                      {/* HEADING 3 */}

                      <button
                        type="button"
                        title="Heading 3"
                        className={
                          storyEditor?.isActive(
                            "heading",
                            { level: 3 }
                          )
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleHeading({
                              level: 3,
                            })
                            .run()
                        }
                      >
                        <Heading3 size={18} />
                      </button>


                      <span className="editorToolbarDivider" />


                      {/* BULLET LIST */}

                      <button
                        type="button"
                        title="Bullet List"
                        className={
                          storyEditor?.isActive(
                            "bulletList"
                          )
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                        }
                      >
                        <List size={18} />
                      </button>


                      {/* NUMBERED LIST */}

                      <button
                        type="button"
                        title="Numbered List"
                        className={
                          storyEditor?.isActive(
                            "orderedList"
                          )
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                        }
                      >
                        <ListOrdered size={18} />
                      </button>


                      {/* LINK */}

                      <button
                        type="button"
                        title="Add Link"
                        className={
                          storyEditor?.isActive("link")
                            ? "editorTool editorToolActive"
                            : "editorTool"
                        }
                        onClick={addLink}
                      >
                        <LinkIcon size={17} />
                      </button>


                      <span className="editorToolbarDivider" />


                      {/* UNDO */}

                      <button
                        type="button"
                        title="Undo"
                        className="editorTool"
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .undo()
                            .run()
                        }
                      >
                        <Undo2 size={17} />
                      </button>


                      {/* REDO */}

                      <button
                        type="button"
                        title="Redo"
                        className="editorTool"
                        onClick={() =>
                          storyEditor
                            ?.chain()
                            .focus()
                            .redo()
                            .run()
                        }
                      >
                        <Redo2 size={17} />
                      </button>

                    </div>


                    {/* EDITOR */}

                    <EditorContent style={{border:"1px solid lightgrey", minHeight:"100px"}}
                      editor={storyEditor}
                    />

                  </div>

                  <small>
                    Use the toolbar to format your story.
                    Paragraphs, headings, bold text, underlined
                    text, lists, links and spacing will be preserved.
                  </small>

                </div>


                {/* ACTIONS */}

                <div className="formActions">

                  <button
                    type="button"
                    className="cancelFormButton"
                    onClick={closeBlogForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="saveFormButton"
                    disabled={savingBlog}
                  >

                    <Save size={18} />

                    {savingBlog
                      ? "Saving..."
                      : editingBlogId
                      ? "Update Blog"
                      : "Publish Blog"}

                  </button>

                </div>

              </form>

            </div>

          )}


          {/* =================================================
              EVENT FORM
          ================================================= */}

          {showEventForm && (

            <div className="contentPanel formPanel">

              <div className="formPanelHeader">

                <div>

                  <p className="managementEyebrow">
                    {editingEventId
                      ? "EDIT EVENT"
                      : "NEW EVENT"}
                  </p>

                  <h3>
                    {editingEventId
                      ? "Update Upcoming Event"
                      : "Create Upcoming Event"}
                  </h3>

                </div>

                <button
                  type="button"
                  className="closeFormButton"
                  onClick={closeEventForm}
                >
                  <X size={20} />
                </button>

              </div>


              <form
                className="contentForm"
                onSubmit={handleEventSubmit}
              >

                {/* TITLE */}

                <div className="formField">

                  <label htmlFor="event-title">
                    Title
                  </label>

                  <input
                    id="event-title"
                    type="text"
                    value={eventForm.title}
                    onChange={(event) =>
                      updateEventField(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="Enter event title"
                    required
                  />

                </div>


                {/* IMAGE */}

                <div className="formField">

                  <label htmlFor="event-image">
                    Image URL
                  </label>

                  <div className="inputWithIcon">

                    <ImageIcon size={18} />

                    <input
                      id="event-image"
                      type="url"
                      value={eventForm.image}
                      onChange={(event) =>
                        updateEventField(
                          "image",
                          event.target.value
                        )
                      }
                      placeholder="https://example.com/event.jpg"
                      required
                    />

                  </div>

                  <small>
                    Image upload will be connected next.
                  </small>

                </div>


                {/* DATE + TIME */}

                <div className="formTwoColumns">

                  <div className="formField">

                    <label htmlFor="event-date">
                      Date
                    </label>

                    <input
                      id="event-date"
                      type="date"
                      value={eventForm.date}
                      onChange={(event) =>
                        updateEventField(
                          "date",
                          event.target.value
                        )
                      }
                      required
                    />

                  </div>


                  <div className="formField">

                    <label htmlFor="event-time">
                      Time
                    </label>

                    <input
                      id="event-time"
                      type="time"
                      value={eventForm.time}
                      onChange={(event) =>
                        updateEventField(
                          "time",
                          event.target.value
                        )
                      }
                      required
                    />

                  </div>

                </div>


                {/* VENUE */}

                <div className="formField">

                  <label htmlFor="event-venue">
                    Venue
                  </label>

                  <div className="inputWithIcon">

                    <MapPin size={18} />

                    <input
                      id="event-venue"
                      type="text"
                      value={eventForm.venue}
                      onChange={(event) =>
                        updateEventField(
                          "venue",
                          event.target.value
                        )
                      }
                      placeholder="Enter event venue"
                      required
                    />

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="formActions">

                  <button
                    type="button"
                    className="cancelFormButton"
                    onClick={closeEventForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="saveFormButton"
                    disabled={savingEvent}
                  >

                    <Save size={18} />

                    {savingEvent
                      ? "Saving..."
                      : editingEventId
                      ? "Update Event"
                      : "Publish Event"}

                  </button>

                </div>

              </form>

            </div>

          )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading &&
            !showBlogForm &&
            !showEventForm && (

              <div className="contentPanel">

                <div className="emptyState">

                  <div className="emptyIcon">
                    <BookOpen size={34} />
                  </div>

                  <h3>
                    Loading content...
                  </h3>

                  <p>
                    Fetching your content from the database.
                  </p>

                </div>

              </div>

            )}


          {/* =================================================
              BLOG LIST
          ================================================= */}

          {!loading &&
            !showBlogForm &&
            activeSection === "blog" && (

              <div className="contentPanel">

                {blogs.length === 0 ? (

                  <div className="emptyState">

                    <div className="emptyIcon">
                      <BookOpen size={34} />
                    </div>

                    <h3>
                      No blog posts yet
                    </h3>

                    <p>
                      Your published blog posts will appear
                      here. Start by creating your first post.
                    </p>

                    <button
                      type="button"
                      className="emptyStateButton"
                      onClick={openCreateBlog}
                    >

                      <Plus size={18} />

                      <span>
                        Create Your First Blog
                      </span>

                    </button>

                  </div>

                ) : (

                  <div className="contentList">

                    {blogs.map((blog) => (

                      <article
                        className="contentListCard"
                        key={blog.id}
                      >

                        <div className="contentListImage">

                          {blog.image ? (

                            <img
                              src={blog.image}
                              alt={blog.title}
                            />

                          ) : (

                            <div className="noImage">
                              <ImageIcon size={30} />
                            </div>

                          )}

                        </div>


                        <div className="contentListDetails">

                          <div className="contentListTitleRow">

                            <h3>
                              {blog.title}
                            </h3>

                            <span className="contentDate">
                              {formatDate(blog.date)}
                            </span>

                          </div>

                          <p className="contentDescription">
                            {blog.description}
                          </p>

                          <div className="contentActions">

                            <button
                              type="button"
                              className="editButton"
                              onClick={() =>
                                openEditBlog(blog)
                              }
                            >

                              <Pencil size={16} />

                              Edit

                            </button>


                            <button
                              type="button"
                              className="deleteButton"
                              disabled={
                                deletingId === blog.id
                              }
                              onClick={() =>
                                handleDeleteBlog(blog.id)
                              }
                            >

                              <Trash2 size={16} />

                              {deletingId === blog.id
                                ? "Deleting..."
                                : "Delete"}

                            </button>

                          </div>

                        </div>

                      </article>

                    ))}

                  </div>

                )}

              </div>

            )}


          {/* =================================================
              EVENT LIST
          ================================================= */}

          {!loading &&
            !showEventForm &&
            activeSection === "events" && (

              <div className="contentPanel">

                {events.length === 0 ? (

                  <div className="emptyState">

                    <div className="emptyIcon emptyIconGreen">
                      <CalendarDays size={34} />
                    </div>

                    <h3>
                      No upcoming events
                    </h3>

                    <p>
                      Your upcoming events will appear here.
                      Start by creating your first event.
                    </p>

                    <button
                      type="button"
                      className="emptyStateButton"
                      onClick={openCreateEvent}
                    >

                      <Plus size={18} />

                      <span>
                        Create Your First Event
                      </span>

                    </button>

                  </div>

                ) : (

                  <div className="contentList">

                    {events.map((event) => (

                      <article
                        className="contentListCard"
                        key={event.id}
                      >

                        <div className="contentListImage">

                          {event.image ? (

                            <img
                              src={event.image}
                              alt={event.title}
                            />

                          ) : (

                            <div className="noImage">
                              <ImageIcon size={30} />
                            </div>

                          )}

                        </div>


                        <div className="contentListDetails">

                          <div className="contentListTitleRow">

                            <h3>
                              {event.title}
                            </h3>

                            <span className="contentDate">
                              {formatDate(event.date)}
                            </span>

                          </div>


                          <div className="eventMeta">

                            <span>
                              <Clock size={15} />
                              {event.time}
                            </span>

                            <span>
                              <MapPin size={15} />
                              {event.venue}
                            </span>

                          </div>


                          <div className="contentActions">

                            <button
                              type="button"
                              className="editButton"
                              onClick={() =>
                                openEditEvent(event)
                              }
                            >

                              <Pencil size={16} />

                              Edit

                            </button>


                            <button
                              type="button"
                              className="deleteButton"
                              disabled={
                                deletingId === event.id
                              }
                              onClick={() =>
                                handleDeleteEvent(event.id)
                              }
                            >

                              <Trash2 size={16} />

                              {deletingId === event.id
                                ? "Deleting..."
                                : "Delete"}

                            </button>

                          </div>

                        </div>

                      </article>

                    ))}

                  </div>

                )}

              </div>

            )}

        </section>


        {/* ===================================================
            QUICK INFORMATION
        =================================================== */}

        <section className="quickInformation">

          <div className="quickInfoCard">

            <div className="quickInfoIcon">
              <Clock size={20} />
            </div>

            <div>

              <strong>
                Content Management
              </strong>

              <p>
                Create, edit and manage everything
                published on the EDHF website.
              </p>

            </div>

          </div>


          <div className="quickInfoCard">

            <div className="quickInfoIcon">
              <MapPin size={20} />
            </div>

            <div>

              <strong>
                Upcoming Events
              </strong>

              <p>
                Keep visitors informed about
                foundation activities and events.
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer className="dashboardFooter">

          <p>
            ©{new Date().getFullYear()} Elisha Development
            and Humanitarian Foundation. Admin Dashboard.
          </p>

        </footer>

      </section>

    </main>
  );
}