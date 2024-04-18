/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos, and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 - 2023 George MacKerron
Released under the MIT licence: see LICENCE file
*/

declare module 'zapatos/schema' {

  import type * as db from 'zapatos/db';

  // got a type error on schemaVersionCanary below? update by running `npx zapatos`
  export interface schemaVersionCanary extends db.SchemaVersionCanary { version: 104 }


  /* === schema: public === */

  /* --- enums --- */
  /* (none) */

  /* --- tables --- */

  /**
   * **test**
   * - Table in database
   */
  export namespace test {
    export type Table = 'test';
    export interface Selectable {
      /**
      * **test.email**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      email: string;
      /**
      * **test.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('test_id_seq'::regclass)`
      */
      id: number;
      /**
      * **test.name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      name: string;
    }
    export interface JSONSelectable {
      /**
      * **test.email**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      email: string;
      /**
      * **test.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('test_id_seq'::regclass)`
      */
      id: number;
      /**
      * **test.name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      name: string;
    }
    export interface Whereable {
      /**
      * **test.email**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      email?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **test.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('test_id_seq'::regclass)`
      */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **test.name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **test.email**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      email: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **test.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('test_id_seq'::regclass)`
      */
      id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **test.name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      name: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **test.email**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      email?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **test.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('test_id_seq'::regclass)`
      */
      id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **test.name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export type UniqueIndex = 'test_email_key' | 'test_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /* --- aggregate types --- */

  export namespace public {  
    export type Table = test.Table;
    export type Selectable = test.Selectable;
    export type JSONSelectable = test.JSONSelectable;
    export type Whereable = test.Whereable;
    export type Insertable = test.Insertable;
    export type Updatable = test.Updatable;
    export type UniqueIndex = test.UniqueIndex;
    export type Column = test.Column;
  
    export type AllBaseTables = [test.Table];
    export type AllForeignTables = [];
    export type AllViews = [];
    export type AllMaterializedViews = [];
    export type AllTablesAndViews = [test.Table];
  }



  /* === global aggregate types === */

  export type Schema = 'public';
  export type Table = public.Table;
  export type Selectable = public.Selectable;
  export type JSONSelectable = public.JSONSelectable;
  export type Whereable = public.Whereable;
  export type Insertable = public.Insertable;
  export type Updatable = public.Updatable;
  export type UniqueIndex = public.UniqueIndex;
  export type Column = public.Column;

  export type AllSchemas = ['public'];
  export type AllBaseTables = [...public.AllBaseTables];
  export type AllForeignTables = [...public.AllForeignTables];
  export type AllViews = [...public.AllViews];
  export type AllMaterializedViews = [...public.AllMaterializedViews];
  export type AllTablesAndViews = [...public.AllTablesAndViews];


  /* === lookups === */

  export type SelectableForTable<T extends Table> = {
    "test": test.Selectable;
  }[T];

  export type JSONSelectableForTable<T extends Table> = {
    "test": test.JSONSelectable;
  }[T];

  export type WhereableForTable<T extends Table> = {
    "test": test.Whereable;
  }[T];

  export type InsertableForTable<T extends Table> = {
    "test": test.Insertable;
  }[T];

  export type UpdatableForTable<T extends Table> = {
    "test": test.Updatable;
  }[T];

  export type UniqueIndexForTable<T extends Table> = {
    "test": test.UniqueIndex;
  }[T];

  export type ColumnForTable<T extends Table> = {
    "test": test.Column;
  }[T];

  export type SQLForTable<T extends Table> = {
    "test": test.SQL;
  }[T];

}
