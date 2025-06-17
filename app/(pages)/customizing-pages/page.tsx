"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PageEditor } from "./components/page-editor";
import { PagesList } from "./components/pages-list";
import { PageViewer } from "./components/page-viewer";
import { initialPages } from "./data/pages-data";

export default function PagesManagement() {
  const [pages, setPages] = useState(initialPages);
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [editedPage, setEditedPage] = useState(pages[0]);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleSelectPage = (page: (typeof pages)[0]) => {
    setSelectedPage(page);
    setEditedPage(JSON.parse(JSON.stringify(page))); // Deep copy
    setEditMode(false);
  };

  const handleEditPage = () => {
    setEditMode(true);
  };

  const handleSavePage = () => {
    const updatedPages = pages.map((page) =>
      page.id === editedPage.id
        ? { ...editedPage, lastUpdated: "Just now" }
        : page
    );
    setPages(updatedPages);
    setSelectedPage(editedPage);
    setEditMode(false);
  };

  const handlePublishPage = () => {
    const updatedPage = {
      ...editedPage,
      status: "Published",
      lastUpdated: "Just now",
    };
    const updatedPages = pages.map((page) =>
      page.id === updatedPage.id ? updatedPage : page
    );
    setPages(updatedPages);
    setSelectedPage(updatedPage);
    setEditedPage(updatedPage);
    setEditMode(false);
  };

  const handleSaveAsDraft = () => {
    const updatedPage = {
      ...editedPage,
      status: "Draft",
      lastUpdated: "Just now",
    };
    const updatedPages = pages.map((page) =>
      page.id === updatedPage.id ? updatedPage : page
    );
    setPages(updatedPages);
    setSelectedPage(updatedPage);
    setEditedPage(updatedPage);
    setEditMode(false);
  };

  const handleAddNewPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      title: "New Page",
      slug: "new-page",
      status: "Draft",
      lastUpdated: "Just now",
      sections: [
        {
          id: `section-${Date.now()}`,
          type: "text",
          title: "New Section",
          content: "Add your content here",
        },
      ],
    };
    setPages([...pages, newPage]);
    setSelectedPage(newPage);
    setEditedPage(newPage);
    setEditMode(true);
  };

  const handleDeletePage = (pageId: string) => {
    const updatedPages = pages.filter((page) => page.id !== pageId);
    setPages(updatedPages);
    if (selectedPage.id === pageId && updatedPages.length > 0) {
      setSelectedPage(updatedPages[0]);
      setEditedPage(updatedPages[0]);
    }
  };

  const handleDuplicatePage = (page: (typeof pages)[0]) => {
    const newPage = {
      ...JSON.parse(JSON.stringify(page)),
      id: `${page.id}-copy`,
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: "Draft",
      lastUpdated: "Just now",
    };
    setPages([...pages, newPage]);
  };

  return (
    <div className="space-y-6 p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pages Management</h1>
          <p className="text-muted-foreground">
            Create and manage pages for your website
          </p>
        </div>
        <Button
          onClick={handleAddNewPage}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Page
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <PagesList
            pages={pages}
            selectedPage={selectedPage}
            activeTab={activeTab}
            selectedStatus={selectedStatus}
            onSelectPage={handleSelectPage}
            onDeletePage={handleDeletePage}
            onDuplicatePage={handleDuplicatePage}
            onTabChange={setActiveTab}
            onStatusChange={setSelectedStatus}
          />
        </div>

        <div className="flex-1">
          <Tabs defaultValue={editMode ? "edit" : "view"}>
            <div className="flex items-center justify-between">
              <TabsList className="mb-4">
                <TabsTrigger value="view" disabled={editMode}>
                  View Page
                </TabsTrigger>
                <TabsTrigger value="edit" disabled={!editMode}>
                  Edit Page
                </TabsTrigger>
              </TabsList>
              {!editMode ? (
                <Button
                  onClick={handleEditPage}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit Page
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSaveAsDraft}>
                    Save as Draft
                  </Button>
                  <Button variant="outline" onClick={handleSavePage}>
                    Save
                  </Button>
                  <Button
                    onClick={handlePublishPage}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Publish
                  </Button>
                </div>
              )}
            </div>

            <TabsContent value="view">
              <PageViewer page={selectedPage} />
            </TabsContent>

            <TabsContent value="edit">
              <PageEditor
                page={editedPage}
                onPageChange={setEditedPage}
                onSave={handleSavePage}
                onSaveAsDraft={handleSaveAsDraft}
                onPublish={handlePublishPage}
                onCancel={() => setEditMode(false)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
