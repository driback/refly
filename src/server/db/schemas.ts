// Suggested code may be subject to a license. Learn more: ~LicenseLog:1087091859.
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar, type AnyPgColumn } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

//Bookmark
export const Bookmarks = pgTable("bookmarks", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID())
    .notNull(),
  url: text("url").unique().notNull(),
  title: text("title"),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

export const BookmarksToTags = pgTable("bookmarks_to_tags", {
  bookmarkId: text("bookmark_id")
    .references(() => Bookmarks.id, { onDelete: "cascade" })
    .notNull(),
  tagId: text("tag_id")
    .references(() => Tags.id, { onDelete: "cascade" })
    .notNull(),
});

//Folder
export const Folders = pgTable("folders", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID())
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  parentId: text("parent_id").references((): AnyPgColumn => Folders.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

export const BookmarksToFolders = pgTable("bookmarks_to_folders", {
  bookmarkId: text("bookmark_id")
    .references(() => Bookmarks.id, { onDelete: "cascade" })
    .notNull(),
  folderId: text("folder_id")
    .references(() => Folders.id, { onDelete: "cascade" })
    .notNull(),
});

//Tag
export const Tags = pgTable("tags", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(10))
    .notNull(),
  name: text("name").unique().notNull(),
});

//Relations
export const BookmarksRelations = relations(Bookmarks, ({ many }) => ({
  tags: many(BookmarksToTags),
  folders: many(BookmarksToFolders),
}));

export const TagsRelations = relations(Tags, ({ many }) => ({
  bookmarks: many(BookmarksToTags),
}));

export const FoldersRelations = relations(Folders, ({ one, many }) => ({
  parent: one(Folders, {
    fields: [Folders.parentId],
    references: [Folders.id],
  }),
  bookmarks: many(BookmarksToFolders),
}));
