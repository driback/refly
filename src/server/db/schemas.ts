import { relations } from "drizzle-orm";
import { type AnyPgColumn, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

//Bookmark
export const Bookmark = pgTable("bookmark", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID())
    .notNull(),
  url: text("url").unique().notNull(),
  title: text("title"),
  description: text("description"),
  imageUrl: text("image_url"),
  iconUrl: text("icon_url"),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
});

export const BookmarkToTag = pgTable("bookmark_to_tag", {
  bookmarkId: text("bookmark_id")
    .references(() => Bookmark.id, { onDelete: "cascade" })
    .notNull(),
  tagId: text("tag_id")
    .references(() => Tag.id, { onDelete: "cascade" })
    .notNull(),
});

//Folder
export const Folder = pgTable("folder", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(10))
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  parentId: text("parent_id").references((): AnyPgColumn => Folder.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
});

export const BookmarkToFolder = pgTable("bookmark_to_folder", {
  bookmarkId: text("bookmark_id")
    .references(() => Bookmark.id, { onDelete: "cascade" })
    .notNull(),
  folderId: text("folder_id")
    .references(() => Folder.id, { onDelete: "cascade" })
    .notNull(),
});

//Tag
export const Tag = pgTable("tag", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(10))
    .notNull(),
  name: text("name").unique().notNull(),
});

//Relations
export const BookmarkRelations = relations(Bookmark, ({ many }) => ({
  tag: many(BookmarkToTag),
  folder: many(BookmarkToFolder),
}));

export const TagRelations = relations(Tag, ({ many }) => ({
  bookmark: many(BookmarkToTag),
}));

export const FolderRelations = relations(Folder, ({ one, many }) => ({
  parent: one(Folder, {
    fields: [Folder.parentId],
    references: [Folder.id],
  }),
  bookmark: many(BookmarkToFolder),
}));
