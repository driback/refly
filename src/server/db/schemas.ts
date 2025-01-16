import { relations } from "drizzle-orm";
import {
  type AnyPgColumn,
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

//Bookmark
export const Bookmark = pgTable("bookmark", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID())
    .notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
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
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
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
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  name: text("name").unique().notNull(),
});

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(10))
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  username: text("username").unique(),
  image: text("image"),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull(),
});

export const session = pgTable("session", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(10))
    .notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(10))
    .notNull(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull(),
});

export const Verification = pgTable("verification", {
  id: text("id")
    .primaryKey()
    .$default(() => nanoid(10))
    .notNull(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { precision: 3, mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }),
});

export const BookmarkRelations = relations(Bookmark, ({ many, one }) => ({
  tag: many(BookmarkToTag),
  folder: many(BookmarkToFolder),
  user: one(user, { fields: [Bookmark.userId], references: [user.id] }),
}));

export const TagRelations = relations(Tag, ({ many, one }) => ({
  bookmark: many(BookmarkToTag),
  user: one(user, { fields: [Tag.userId], references: [user.id] }),
}));

export const FolderRelations = relations(Folder, ({ one, many }) => ({
  parent: one(Folder, {
    fields: [Folder.parentId],
    references: [Folder.id],
  }),
  bookmark: many(BookmarkToFolder),
  user: one(user, { fields: [Folder.userId], references: [user.id] }),
}));
