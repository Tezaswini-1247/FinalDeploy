import path$1 from "node:path";
import path from "path";
import fse from "fs-extra";
import createDebug from "debug";
import _, { isNil, castArray, prop, omit, isInteger, snakeCase, partition, sumBy, cloneDeep, toString, toNumber, isString as isString$1, padCharsEnd, isArray, isPlainObject, isFinite, curry, groupBy, pipe, mapValues, map, isEmpty, maxBy, pick, has, uniqBy, isNull, compact, differenceWith, isEqual, difference, isObject, isNumber as isNumber$1, isUndefined, uniqWith } from "lodash/fp";
import crypto from "crypto";
import crypto$1 from "node:crypto";
import * as dateFns from "date-fns";
import { AsyncLocalStorage } from "node:async_hooks";
import KnexBuilder from "knex/lib/query/querybuilder";
import KnexRaw from "knex/lib/raw";
import { isOperatorOfType, isOperator } from "@strapi/utils";
import { Readable } from "stream";
import _$1 from "lodash";
import { Umzug } from "umzug";
import { createId } from "@paralleldrive/cuid2";
import { strict } from "assert";
import knex from "knex";
class Dialect {
  db;
  schemaInspector = {};
  client;
  constructor(db, client) {
    this.db = db;
    this.client = client;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(conn) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initialize(_nativeConnection) {
  }
  getSqlType(type) {
    return type;
  }
  canAlterConstraints() {
    return true;
  }
  usesForeignKeys() {
    return false;
  }
  useReturning() {
    return false;
  }
  supportsUnsigned() {
    return false;
  }
  supportsOperator() {
    return true;
  }
  async startSchemaUpdate() {
  }
  async endSchemaUpdate() {
  }
  transformErrors(error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error.message);
  }
  canAddIncrements() {
    return true;
  }
}
class DatabaseError extends Error {
  details;
  constructor(message = "A database error occured", details = {}) {
    super();
    this.name = "DatabaseError";
    this.message = message;
    this.details = details;
  }
}
class NotNullError extends DatabaseError {
  constructor({ column = "" } = {}) {
    super(`Not null constraint violation${column ? ` on column ${column}` : ""}.`);
    this.name = "NotNullError";
    this.details = { column };
    this.stack = "";
  }
}
class InvalidTimeError extends DatabaseError {
  constructor(message = "Invalid time format, expected HH:mm:ss.SSS") {
    super(message);
    this.name = "InvalidTimeFormat";
  }
}
class InvalidDateError extends DatabaseError {
  constructor(message = "Invalid date format, expected YYYY-MM-DD") {
    super(message);
    this.name = "InvalidDateFormat";
  }
}
class InvalidDateTimeError extends DatabaseError {
  constructor(message = "Invalid relation format") {
    super(message);
    this.name = "InvalidDatetimeFormat";
  }
}
class InvalidRelationError extends DatabaseError {
  constructor(message = "Invalid relation format") {
    super(message);
    this.name = "InvalidRelationFormat";
  }
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DatabaseError,
  InvalidDateError,
  InvalidDateTimeError,
  InvalidRelationError,
  InvalidTimeError,
  NotNullError
}, Symbol.toStringTag, { value: "Module" }));
const SQL_QUERIES$3 = {
  TABLE_LIST: (
    /* sql */
    `
    SELECT *
    FROM information_schema.tables
    WHERE
      table_schema = ?
      AND table_type = 'BASE TABLE'
      AND table_name != 'geometry_columns'
      AND table_name != 'spatial_ref_sys';
  `
  ),
  LIST_COLUMNS: (
    /* sql */
    `
    SELECT data_type, column_name, character_maximum_length, column_default, is_nullable
    FROM information_schema.columns
    WHERE table_schema = ? AND table_name = ?;
  `
  ),
  INDEX_LIST: (
    /* sql */
    `
    SELECT
      ix.indexrelid,
      i.relname as index_name,
      a.attname as column_name,
      ix.indisunique as is_unique,
      ix.indisprimary as is_primary
    FROM
      pg_class t,
      pg_namespace s,
      pg_class i,
      pg_index ix,
      pg_attribute a
    WHERE
      t.oid = ix.indrelid
      AND i.oid = ix.indexrelid
      AND a.attrelid = t.oid
      AND a.attnum = ANY(ix.indkey)
      AND t.relkind = 'r'
      AND t.relnamespace = s.oid
      AND s.nspname = ?
      AND t.relname = ?;
  `
  ),
  FOREIGN_KEY_LIST: (
    /* sql */
    `
    SELECT
      tco."constraint_name" as constraint_name
    FROM information_schema.table_constraints tco
    WHERE
      tco.constraint_type = 'FOREIGN KEY'
      AND tco.constraint_schema = ?
      AND tco.table_name = ?
  `
  ),
  FOREIGN_KEY_REFERENCES: (
    /* sql */
    `
    SELECT
      kcu."constraint_name" as constraint_name,
      kcu."column_name" as column_name

    FROM information_schema.key_column_usage kcu
    WHERE kcu.constraint_name=ANY(?)
    AND kcu.table_schema = ?
    AND kcu.table_name = ?;
  `
  ),
  FOREIGN_KEY_REFERENCES_CONSTRAIN: (
    /* sql */
    `
  SELECT
  rco.update_rule as on_update,
  rco.delete_rule as on_delete,
  rco."unique_constraint_name" as unique_constraint_name
  FROM information_schema.referential_constraints rco
  WHERE rco.constraint_name=ANY(?)
  AND rco.constraint_schema = ?
`
  ),
  FOREIGN_KEY_REFERENCES_CONSTRAIN_RFERENCE: (
    /* sql */
    `
  SELECT
  rel_kcu."table_name" as foreign_table,
  rel_kcu."column_name" as fk_column_name
    FROM information_schema.key_column_usage rel_kcu
    WHERE rel_kcu.constraint_name=?
    AND rel_kcu.table_schema = ?
`
  )
};
const toStrapiType$2 = (column) => {
  const rootType = column.data_type.toLowerCase().match(/[^(), ]+/)?.[0];
  switch (rootType) {
    case "integer": {
      return { type: "integer" };
    }
    case "text": {
      return { type: "text", args: ["longtext"] };
    }
    case "boolean": {
      return { type: "boolean" };
    }
    case "character": {
      return { type: "string", args: [column.character_maximum_length] };
    }
    case "timestamp": {
      return { type: "datetime", args: [{ useTz: false, precision: 6 }] };
    }
    case "date": {
      return { type: "date" };
    }
    case "time": {
      return { type: "time", args: [{ precision: 3 }] };
    }
    case "numeric": {
      return { type: "decimal", args: [10, 2] };
    }
    case "real":
    case "double": {
      return { type: "double" };
    }
    case "bigint": {
      return { type: "bigInteger" };
    }
    case "jsonb": {
      return { type: "jsonb" };
    }
    default: {
      return { type: "specificType", args: [column.data_type] };
    }
  }
};
const getIndexType = (index2) => {
  if (index2.is_primary) {
    return "primary";
  }
  if (index2.is_unique) {
    return "unique";
  }
};
class PostgresqlSchemaInspector {
  db;
  constructor(db) {
    this.db = db;
  }
  async getSchema() {
    const schema = { tables: [] };
    const tables = await this.getTables();
    schema.tables = await Promise.all(
      tables.map(async (tableName) => {
        const columns = await this.getColumns(tableName);
        const indexes = await this.getIndexes(tableName);
        const foreignKeys = await this.getForeignKeys(tableName);
        return {
          name: tableName,
          columns,
          indexes,
          foreignKeys
        };
      })
    );
    return schema;
  }
  getDatabaseSchema() {
    return this.db.getSchemaName() || "public";
  }
  async getTables() {
    const { rows } = await this.db.connection.raw(SQL_QUERIES$3.TABLE_LIST, [
      this.getDatabaseSchema()
    ]);
    return rows.map((row) => row.table_name);
  }
  async getColumns(tableName) {
    const { rows } = await this.db.connection.raw(SQL_QUERIES$3.LIST_COLUMNS, [
      this.getDatabaseSchema(),
      tableName
    ]);
    return rows.map((row) => {
      const { type, args = [], ...rest } = toStrapiType$2(row);
      const defaultTo = row.column_default && row.column_default.includes("nextval(") ? null : row.column_default;
      return {
        type,
        args,
        defaultTo,
        name: row.column_name,
        notNullable: row.is_nullable === "NO",
        unsigned: false,
        ...rest
      };
    });
  }
  async getIndexes(tableName) {
    const { rows } = await this.db.connection.raw(SQL_QUERIES$3.INDEX_LIST, [
      this.getDatabaseSchema(),
      tableName
    ]);
    const ret = {};
    for (const index2 of rows) {
      if (index2.column_name === "id") {
        continue;
      }
      if (!ret[index2.indexrelid]) {
        ret[index2.indexrelid] = {
          columns: [index2.column_name],
          name: index2.index_name,
          type: getIndexType(index2)
        };
      } else {
        ret[index2.indexrelid].columns.push(index2.column_name);
      }
    }
    return Object.values(ret);
  }
  async getForeignKeys(tableName) {
    const { rows } = await this.db.connection.raw(
      SQL_QUERIES$3.FOREIGN_KEY_LIST,
      [this.getDatabaseSchema(), tableName]
    );
    const ret = {};
    for (const fk of rows) {
      ret[fk.constraint_name] = {
        name: fk.constraint_name,
        columns: [],
        referencedColumns: [],
        referencedTable: null,
        onUpdate: null,
        onDelete: null
      };
    }
    const constraintNames = Object.keys(ret);
    const dbSchema = this.getDatabaseSchema();
    if (constraintNames.length > 0) {
      const { rows: fkReferences } = await this.db.connection.raw(
        SQL_QUERIES$3.FOREIGN_KEY_REFERENCES,
        [[constraintNames], dbSchema, tableName]
      );
      for (const fkReference of fkReferences) {
        ret[fkReference.constraint_name].columns.push(fkReference.column_name);
        const { rows: fkReferencesConstraint } = await this.db.connection.raw(
          SQL_QUERIES$3.FOREIGN_KEY_REFERENCES_CONSTRAIN,
          [[fkReference.constraint_name], dbSchema]
        );
        for (const fkReferenceC of fkReferencesConstraint) {
          const { rows: fkReferencesConstraintReferece } = await this.db.connection.raw(
            SQL_QUERIES$3.FOREIGN_KEY_REFERENCES_CONSTRAIN_RFERENCE,
            [fkReferenceC.unique_constraint_name, dbSchema]
          );
          for (const fkReferenceConst of fkReferencesConstraintReferece) {
            ret[fkReference.constraint_name].referencedTable = fkReferenceConst.foreign_table;
            ret[fkReference.constraint_name].referencedColumns.push(
              fkReferenceConst.fk_column_name
            );
          }
          ret[fkReference.constraint_name].onUpdate = fkReferenceC.on_update.toUpperCase();
          ret[fkReference.constraint_name].onDelete = fkReferenceC.on_delete.toUpperCase();
        }
      }
    }
    return Object.values(ret);
  }
}
class PostgresDialect extends Dialect {
  schemaInspector;
  constructor(db) {
    super(db, "postgres");
    this.schemaInspector = new PostgresqlSchemaInspector(db);
  }
  useReturning() {
    return true;
  }
  async initialize(nativeConnection) {
    this.db.connection.client.driver.types.setTypeParser(
      this.db.connection.client.driver.types.builtins.DATE,
      "text",
      (v) => v
    );
    this.db.connection.client.driver.types.setTypeParser(
      this.db.connection.client.driver.types.builtins.JSONB,
      "text",
      (v) => v
    );
    this.db.connection.client.driver.types.setTypeParser(
      this.db.connection.client.driver.types.builtins.NUMERIC,
      "text",
      parseFloat
    );
    const schemaName = this.db.getSchemaName();
    if (schemaName) {
      await this.db.connection.raw(`SET search_path TO "${schemaName}"`).connection(nativeConnection);
    }
  }
  usesForeignKeys() {
    return true;
  }
  getSqlType(type) {
    switch (type) {
      case "timestamp": {
        return "datetime";
      }
      default: {
        return type;
      }
    }
  }
  transformErrors(error) {
    switch (error.code) {
      case "23502": {
        throw new NotNullError({
          column: "column" in error ? `${error.column}` : void 0
        });
      }
      default: {
        super.transformErrors(error);
      }
    }
  }
}
const SQL_QUERIES$2 = {
  TABLE_LIST: (
    /* sql */
    `
    SELECT
      t.table_name as table_name
    FROM information_schema.tables t
    WHERE table_type = 'BASE TABLE'
    AND table_schema = schema();
  `
  ),
  LIST_COLUMNS: (
    /* sql */
    `
    SELECT
      c.data_type as data_type,
      c.column_name as column_name,
      c.character_maximum_length as character_maximum_length,
      c.column_default as column_default,
      c.is_nullable as is_nullable,
      c.column_type as column_type,
      c.column_key as column_key
    FROM information_schema.columns c
    WHERE table_schema = database()
    AND table_name = ?;
  `
  ),
  INDEX_LIST: (
    /* sql */
    `
    show index from ??;
  `
  ),
  FOREIGN_KEY_LIST: (
    /* sql */
    `
    SELECT
      tc.constraint_name as constraint_name
    FROM information_schema.table_constraints tc
    WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = database()
    AND tc.table_name = ?;
  `
  ),
  FOREIGN_KEY_REFERENCES: (
    /* sql */
    `
    SELECT
      kcu.constraint_name as constraint_name,
      kcu.column_name as column_name,
      kcu.referenced_table_name as referenced_table_name,
      kcu.referenced_column_name as referenced_column_name
    FROM information_schema.key_column_usage kcu
    WHERE kcu.constraint_name in (?)
    AND kcu.table_schema = database()
    AND kcu.table_name = ?;
  `
  ),
  FOREIGN_KEY_REFERENTIALS_CONSTRAINTS: (
    /* sql */
    `
    SELECT
      rc.constraint_name as constraint_name,
      rc.update_rule as on_update,
      rc.delete_rule as on_delete
    FROM information_schema.referential_constraints AS rc
    WHERE rc.constraint_name in (?)
    AND rc.constraint_schema = database()
    AND rc.table_name = ?;
  `
  )
};
const toStrapiType$1 = (column) => {
  const rootType = column.data_type.toLowerCase().match(/[^(), ]+/)?.[0];
  switch (rootType) {
    case "int": {
      if (column.column_key === "PRI") {
        return { type: "increments", args: [{ primary: true, primaryKey: true }], unsigned: false };
      }
      return { type: "integer" };
    }
    case "decimal": {
      return { type: "decimal", args: [10, 2] };
    }
    case "double": {
      return { type: "double" };
    }
    case "bigint": {
      return { type: "bigInteger" };
    }
    case "enum": {
      return { type: "string" };
    }
    case "tinyint": {
      return { type: "boolean" };
    }
    case "longtext": {
      return { type: "text", args: ["longtext"] };
    }
    case "varchar": {
      return { type: "string", args: [column.character_maximum_length] };
    }
    case "datetime": {
      return { type: "datetime", args: [{ useTz: false, precision: 6 }] };
    }
    case "date": {
      return { type: "date" };
    }
    case "time": {
      return { type: "time", args: [{ precision: 3 }] };
    }
    case "timestamp": {
      return { type: "timestamp", args: [{ useTz: false, precision: 6 }] };
    }
    case "json": {
      return { type: "jsonb" };
    }
    default: {
      return { type: "specificType", args: [column.data_type] };
    }
  }
};
class MysqlSchemaInspector {
  db;
  constructor(db) {
    this.db = db;
  }
  async getSchema() {
    const schema = { tables: [] };
    const tables = await this.getTables();
    schema.tables = await Promise.all(
      tables.map(async (tableName) => {
        const columns = await this.getColumns(tableName);
        const indexes = await this.getIndexes(tableName);
        const foreignKeys = await this.getForeignKeys(tableName);
        return {
          name: tableName,
          columns,
          indexes,
          foreignKeys
        };
      })
    );
    return schema;
  }
  async getTables() {
    const [rows] = await this.db.connection.raw(SQL_QUERIES$2.TABLE_LIST);
    return rows.map((row) => row.table_name);
  }
  async getColumns(tableName) {
    const [rows] = await this.db.connection.raw(SQL_QUERIES$2.LIST_COLUMNS, [
      tableName
    ]);
    return rows.map((row) => {
      const { type, args = [], ...rest } = toStrapiType$1(row);
      return {
        type,
        args,
        defaultTo: row.column_default,
        name: row.column_name,
        notNullable: row.is_nullable === "NO",
        unsigned: row.column_type.endsWith(" unsigned"),
        ...rest
      };
    });
  }
  async getIndexes(tableName) {
    const [rows] = await this.db.connection.raw(SQL_QUERIES$2.INDEX_LIST, [tableName]);
    const ret = {};
    for (const index2 of rows) {
      if (index2.Column_name === "id") {
        continue;
      }
      if (!ret[index2.Key_name]) {
        const indexInfo = {
          columns: [index2.Column_name],
          name: index2.Key_name
        };
        if (!index2.Non_unique || index2.Non_unique === "0") {
          indexInfo.type = "unique";
        }
        ret[index2.Key_name] = indexInfo;
      } else {
        ret[index2.Key_name].columns.push(index2.Column_name);
      }
    }
    return Object.values(ret);
  }
  async getForeignKeys(tableName) {
    const [rows] = await this.db.connection.raw(SQL_QUERIES$2.FOREIGN_KEY_LIST, [
      tableName
    ]);
    const ret = {};
    for (const fk of rows) {
      ret[fk.constraint_name] = {
        name: fk.constraint_name,
        columns: [],
        referencedColumns: [],
        referencedTable: null,
        onUpdate: null,
        onDelete: null
      };
    }
    const contraintNames = Object.keys(ret);
    if (contraintNames.length > 0) {
      const [fkReferences] = await this.db.connection.raw(SQL_QUERIES$2.FOREIGN_KEY_REFERENCES, [
        contraintNames,
        tableName
      ]);
      for (const fkReference of fkReferences) {
        ret[fkReference.constraint_name].referencedTable = fkReference.referenced_table_name;
        ret[fkReference.constraint_name].columns.push(fkReference.column_name);
        ret[fkReference.constraint_name].referencedColumns.push(fkReference.referenced_column_name);
      }
      const [fkReferentialConstraints] = await this.db.connection.raw(
        SQL_QUERIES$2.FOREIGN_KEY_REFERENTIALS_CONSTRAINTS,
        [contraintNames, tableName]
      );
      for (const fkReferentialConstraint of fkReferentialConstraints) {
        ret[fkReferentialConstraint.constraint_name].onUpdate = fkReferentialConstraint.on_update.toUpperCase();
        ret[fkReferentialConstraint.constraint_name].onDelete = fkReferentialConstraint.on_delete.toUpperCase();
      }
    }
    return Object.values(ret);
  }
}
const MYSQL = "MYSQL";
const MARIADB = "MARIADB";
const SQL_QUERIES$1 = {
  VERSION: `SELECT version() as version`
};
class MysqlDatabaseInspector {
  db;
  constructor(db) {
    this.db = db;
  }
  async getInformation(nativeConnection) {
    let database;
    let versionNumber;
    try {
      const [results] = await this.db.connection.raw(SQL_QUERIES$1.VERSION).connection(nativeConnection);
      const versionSplit = results[0].version.split("-");
      const databaseName = versionSplit[1];
      versionNumber = versionSplit[0];
      database = databaseName && databaseName.toLowerCase() === "mariadb" ? MARIADB : MYSQL;
    } catch (e) {
      return {
        database: null,
        version: null
      };
    }
    return {
      database,
      version: versionNumber
    };
  }
}
class MysqlDialect extends Dialect {
  schemaInspector;
  databaseInspector;
  info = null;
  constructor(db) {
    super(db, "mysql");
    this.schemaInspector = new MysqlSchemaInspector(db);
    this.databaseInspector = new MysqlDatabaseInspector(db);
  }
  configure() {
    const connection = this.db.config.connection.connection;
    connection.supportBigNumbers = true;
    if (connection.bigNumberStrings === void 0) {
      connection.bigNumberStrings = true;
    }
    connection.typeCast = (field, next) => {
      if (field.type === "DECIMAL" || field.type === "NEWDECIMAL") {
        const value = field.string();
        return value === null ? null : Number(value);
      }
      if (field.type === "TINY" && field.length === 1) {
        const value = field.string();
        return value ? value === "1" : null;
      }
      if (field.type === "DATE") {
        return field.string();
      }
      return next();
    };
  }
  async initialize(nativeConnection) {
    try {
      await this.db.connection.raw(`set session sql_require_primary_key = 0;`).connection(nativeConnection);
    } catch (err) {
    }
    if (!this.info) {
      this.info = await this.databaseInspector.getInformation(nativeConnection);
    }
  }
  async startSchemaUpdate() {
    try {
      await this.db.connection.raw(`set foreign_key_checks = 0;`);
      await this.db.connection.raw(`set session sql_require_primary_key = 0;`);
    } catch (err) {
    }
  }
  async endSchemaUpdate() {
    await this.db.connection.raw(`set foreign_key_checks = 1;`);
  }
  supportsUnsigned() {
    return true;
  }
  usesForeignKeys() {
    return true;
  }
  transformErrors(error) {
    super.transformErrors(error);
  }
}
const SQL_QUERIES = {
  TABLE_LIST: `select name from sqlite_master where type = 'table' and name NOT LIKE 'sqlite%'`,
  TABLE_INFO: `pragma table_info(??)`,
  INDEX_LIST: "pragma index_list(??)",
  INDEX_INFO: "pragma index_info(??)",
  FOREIGN_KEY_LIST: "pragma foreign_key_list(??)"
};
const toStrapiType = (column) => {
  const { type } = column;
  const rootType = type.toLowerCase().match(/[^(), ]+/)?.[0];
  switch (rootType) {
    case "integer": {
      if (column.pk) {
        return { type: "increments", args: [{ primary: true, primaryKey: true }] };
      }
      return { type: "integer" };
    }
    case "float": {
      return { type: "float", args: [10, 2] };
    }
    case "bigint": {
      return { type: "bigInteger" };
    }
    case "varchar": {
      const length = type.slice(8, type.length - 1);
      return { type: "string", args: [Number(length)] };
    }
    case "text": {
      return { type: "text", args: ["longtext"] };
    }
    case "json": {
      return { type: "jsonb" };
    }
    case "boolean": {
      return { type: "boolean" };
    }
    case "datetime": {
      return { type: "datetime", args: [{ useTz: false, precision: 6 }] };
    }
    case "date": {
      return { type: "date" };
    }
    case "time": {
      return { type: "time", args: [{ precision: 3 }] };
    }
    default: {
      return { type: "specificType", args: [column.data_type] };
    }
  }
};
class SqliteSchemaInspector {
  db;
  constructor(db) {
    this.db = db;
  }
  async getSchema() {
    const schema = { tables: [] };
    const tables = await this.getTables();
    for (const tableName of tables) {
      const columns = await this.getColumns(tableName);
      const indexes = await this.getIndexes(tableName);
      const foreignKeys = await this.getForeignKeys(tableName);
      schema.tables.push({
        name: tableName,
        columns,
        indexes,
        foreignKeys
      });
    }
    return schema;
  }
  async getTables() {
    const rows = await this.db.connection.raw(SQL_QUERIES.TABLE_LIST);
    return rows.map((row) => row.name);
  }
  async getColumns(tableName) {
    const rows = await this.db.connection.raw(SQL_QUERIES.TABLE_INFO, [tableName]);
    return rows.map((row) => {
      const { type, args = [], ...rest } = toStrapiType(row);
      return {
        type,
        args,
        name: row.name,
        defaultTo: row.dflt_value,
        notNullable: row.notnull !== null ? Boolean(row.notnull) : null,
        unsigned: false,
        ...rest
      };
    });
  }
  async getIndexes(tableName) {
    const indexes = await this.db.connection.raw(SQL_QUERIES.INDEX_LIST, [tableName]);
    const ret = [];
    for (const index2 of indexes.filter((index22) => !index22.name.startsWith("sqlite_"))) {
      const res = await this.db.connection.raw(SQL_QUERIES.INDEX_INFO, [
        index2.name
      ]);
      const indexInfo = {
        columns: res.map((row) => row.name),
        name: index2.name
      };
      if (index2.unique) {
        indexInfo.type = "unique";
      }
      ret.push(indexInfo);
    }
    return ret;
  }
  async getForeignKeys(tableName) {
    const fks = await this.db.connection.raw(SQL_QUERIES.FOREIGN_KEY_LIST, [
      tableName
    ]);
    const ret = {};
    for (const fk of fks) {
      if (!ret[fk.id]) {
        ret[fk.id] = {
          // TODO: name, //  find name
          name: "",
          columns: [fk.from],
          referencedColumns: [fk.to],
          referencedTable: fk.table,
          onUpdate: fk.on_update.toUpperCase(),
          onDelete: fk.on_delete.toUpperCase()
        };
      } else {
        ret[fk.id].columns.push(fk.from);
        ret[fk.id].referencedColumns.push(fk.to);
      }
    }
    return Object.values(ret);
  }
}
const UNSUPPORTED_OPERATORS = ["$jsonSupersetOf"];
class SqliteDialect extends Dialect {
  schemaInspector;
  constructor(db) {
    super(db, "sqlite");
    this.schemaInspector = new SqliteSchemaInspector(db);
  }
  configure(conn) {
    const connection = conn || this.db.config.connection.connection;
    if (typeof connection !== "string") {
      connection.filename = path.resolve(connection.filename);
    }
    const dbDir = path.dirname(connection.filename);
    fse.ensureDirSync(dbDir);
  }
  useReturning() {
    return true;
  }
  async initialize(nativeConnection) {
    await this.db.connection.raw("pragma foreign_keys = on").connection(nativeConnection);
  }
  canAlterConstraints() {
    return false;
  }
  getSqlType(type) {
    switch (type) {
      case "enum": {
        return "text";
      }
      case "double":
      case "decimal": {
        return "float";
      }
      case "timestamp": {
        return "datetime";
      }
      default: {
        return type;
      }
    }
  }
  supportsOperator(operator) {
    return !UNSUPPORTED_OPERATORS.includes(operator);
  }
  async startSchemaUpdate() {
    await this.db.connection.raw(`pragma foreign_keys = off`);
  }
  async endSchemaUpdate() {
    await this.db.connection.raw(`pragma foreign_keys = on`);
  }
  transformErrors(error) {
    switch (error.errno) {
      case 19: {
        throw new NotNullError();
      }
      default: {
        super.transformErrors(error);
      }
    }
  }
  canAddIncrements() {
    return false;
  }
}
const getDialectClass = (client) => {
  switch (client) {
    case "postgres":
      return PostgresDialect;
    case "mysql":
      return MysqlDialect;
    case "sqlite":
      return SqliteDialect;
    default:
      throw new Error(`Unknown dialect ${client}`);
  }
};
const getDialectName = (client) => {
  switch (client) {
    case "postgres":
      return "postgres";
    case "mysql":
      return "mysql";
    case "sqlite":
      return "sqlite";
    default:
      throw new Error(`Unknown dialect ${client}`);
  }
};
const getDialect = (db) => {
  const { client } = db.config.connection;
  const dialectName = getDialectName(client);
  const constructor = getDialectClass(dialectName);
  const dialect = new constructor(db, dialectName);
  return dialect;
};
const debug$2 = createDebug("strapi::database");
const createSchemaBuilder = (db) => {
  const helpers2 = createHelpers(db);
  return {
    /**
     * Returns a knex schema builder instance
     * @param {string} table - table name
     */
    getSchemaBuilder(trx) {
      return db.getSchemaConnection(trx);
    },
    /**
     * Creates schema in DB
     */
    async createSchema(schema) {
      await db.connection.transaction(async (trx) => {
        await this.createTables(schema.tables, trx);
      });
    },
    /**
     * Creates a list of tables in a schema
     * @param {KnexInstance} trx
     * @param {Table[]} tables
     */
    async createTables(tables, trx) {
      for (const table of tables) {
        debug$2(`Creating table: ${table.name}`);
        const schemaBuilder = this.getSchemaBuilder(trx);
        await helpers2.createTable(schemaBuilder, table);
      }
      for (const table of tables) {
        debug$2(`Creating table foreign keys: ${table.name}`);
        const schemaBuilder = this.getSchemaBuilder(trx);
        await helpers2.createTableForeignKeys(schemaBuilder, table);
      }
    },
    /**
     * Drops schema from DB
     */
    async dropSchema(schema, { dropDatabase = false } = {}) {
      if (dropDatabase) {
        return;
      }
      await db.connection.transaction(async (trx) => {
        for (const table of schema.tables.reverse()) {
          const schemaBuilder = this.getSchemaBuilder(trx);
          await helpers2.dropTable(schemaBuilder, table);
        }
      });
    },
    /**
     * Applies a schema diff update in the DB
     * @param {*} schemaDiff
     */
    // TODO: implement force option to disable removal in DB
    async updateSchema(schemaDiff) {
      const forceMigration = db.config.settings?.forceMigration;
      await db.dialect.startSchemaUpdate();
      await db.connection.transaction(async (trx) => {
        await this.createTables(schemaDiff.tables.added, trx);
        if (forceMigration) {
          for (const table of schemaDiff.tables.removed) {
            debug$2(`Removing table foreign keys: ${table.name}`);
            const schemaBuilder = this.getSchemaBuilder(trx);
            await helpers2.dropTableForeignKeys(schemaBuilder, table);
          }
          for (const table of schemaDiff.tables.removed) {
            debug$2(`Removing table: ${table.name}`);
            const schemaBuilder = this.getSchemaBuilder(trx);
            await helpers2.dropTable(schemaBuilder, table);
          }
        }
        for (const table of schemaDiff.tables.updated) {
          debug$2(`Updating table: ${table.name}`);
          const schemaBuilder = this.getSchemaBuilder(trx);
          await helpers2.alterTable(schemaBuilder, table);
        }
      });
      await db.dialect.endSchemaUpdate();
    }
  };
};
const createHelpers = (db) => {
  const createForeignKey = (tableBuilder, foreignKey) => {
    const { name, columns, referencedColumns, referencedTable, onDelete, onUpdate } = foreignKey;
    const constraint = tableBuilder.foreign(columns, name).references(referencedColumns).inTable(db.getSchemaName() ? `${db.getSchemaName()}.${referencedTable}` : referencedTable);
    if (onDelete) {
      constraint.onDelete(onDelete);
    }
    if (onUpdate) {
      constraint.onUpdate(onUpdate);
    }
  };
  const dropForeignKey = (tableBuilder, foreignKey) => {
    const { name, columns } = foreignKey;
    tableBuilder.dropForeign(columns, name);
  };
  const createIndex = (tableBuilder, index2) => {
    const { type, columns, name } = index2;
    switch (type) {
      case "primary": {
        return tableBuilder.primary(columns, name);
      }
      case "unique": {
        return tableBuilder.unique(columns, name);
      }
      default: {
        return tableBuilder.index(columns, name, type);
      }
    }
  };
  const dropIndex2 = (tableBuilder, index2) => {
    if (!db.config.settings?.forceMigration) {
      return;
    }
    const { type, columns, name } = index2;
    switch (type) {
      case "primary": {
        return tableBuilder.dropPrimary(name);
      }
      case "unique": {
        return tableBuilder.dropUnique(columns, name);
      }
      default: {
        return tableBuilder.dropIndex(columns, name);
      }
    }
  };
  const createColumn2 = (tableBuilder, column) => {
    const { type, name, args = [], defaultTo, unsigned, notNullable } = column;
    const col = tableBuilder[type](name, ...args);
    if (unsigned === true) {
      col.unsigned();
    }
    if (!isNil(defaultTo)) {
      const [value, opts] = castArray(defaultTo);
      if (prop("isRaw", opts)) {
        col.defaultTo(db.connection.raw(value), omit("isRaw", opts));
      } else {
        col.defaultTo(value, opts);
      }
    }
    if (notNullable === true) {
      col.notNullable();
    } else {
      col.nullable();
    }
    return col;
  };
  const dropColumn = (tableBuilder, column) => {
    if (!db.config.settings?.forceMigration) {
      return;
    }
    return tableBuilder.dropColumn(column.name);
  };
  const createTable2 = async (schemaBuilder, table) => {
    await schemaBuilder.createTable(table.name, (tableBuilder) => {
      (table.columns || []).forEach((column) => createColumn2(tableBuilder, column));
      (table.indexes || []).forEach((index2) => createIndex(tableBuilder, index2));
      if (!db.dialect.canAlterConstraints()) {
        (table.foreignKeys || []).forEach(
          (foreignKey) => createForeignKey(tableBuilder, foreignKey)
        );
      }
    });
  };
  const alterTable = async (schemaBuilder, table) => {
    await schemaBuilder.alterTable(table.name, (tableBuilder) => {
      for (const removedForeignKey of table.foreignKeys.removed) {
        debug$2(`Dropping foreign key ${removedForeignKey.name} on ${table.name}`);
        dropForeignKey(tableBuilder, removedForeignKey);
      }
      for (const updatedForeignKey of table.foreignKeys.updated) {
        debug$2(`Dropping updated foreign key ${updatedForeignKey.name} on ${table.name}`);
        dropForeignKey(tableBuilder, updatedForeignKey.object);
      }
      const isMySQL = db.config.connection.client === "mysql";
      const ignoreForeignKeyNames = isMySQL ? [
        ...table.foreignKeys.removed.map((fk) => fk.name),
        ...table.foreignKeys.updated.map((fk) => fk.name)
      ] : [];
      for (const removedIndex of table.indexes.removed) {
        if (!ignoreForeignKeyNames.includes(removedIndex.name)) {
          debug$2(`Dropping index ${removedIndex.name} on ${table.name}`);
          dropIndex2(tableBuilder, removedIndex);
        }
      }
      for (const updatedIndex of table.indexes.updated) {
        if (!ignoreForeignKeyNames.includes(updatedIndex.name)) {
          debug$2(`Dropping updated index ${updatedIndex.name} on ${table.name}`);
          dropIndex2(tableBuilder, updatedIndex.object);
        }
      }
      for (const removedColumn of table.columns.removed) {
        debug$2(`Dropping column ${removedColumn.name} on ${table.name}`);
        dropColumn(tableBuilder, removedColumn);
      }
      for (const updatedColumn of table.columns.updated) {
        debug$2(`Updating column ${updatedColumn.name} on ${table.name}`);
        const { object } = updatedColumn;
        if (object.type === "increments") {
          createColumn2(tableBuilder, { ...object, type: "integer" }).alter();
        } else {
          createColumn2(tableBuilder, object).alter();
        }
      }
      for (const addedColumn of table.columns.added) {
        debug$2(`Creating column ${addedColumn.name} on ${table.name}`);
        if (addedColumn.type === "increments" && !db.dialect.canAddIncrements()) {
          tableBuilder.integer(addedColumn.name).unsigned();
          tableBuilder.primary([addedColumn.name]);
        } else {
          createColumn2(tableBuilder, addedColumn);
        }
      }
      for (const updatedForeignKey of table.foreignKeys.updated) {
        debug$2(`Recreating updated foreign key ${updatedForeignKey.name} on ${table.name}`);
        createForeignKey(tableBuilder, updatedForeignKey.object);
      }
      for (const updatedIndex of table.indexes.updated) {
        debug$2(`Recreating updated index ${updatedIndex.name} on ${table.name}`);
        createIndex(tableBuilder, updatedIndex.object);
      }
      for (const addedForeignKey of table.foreignKeys.added) {
        debug$2(`Creating foreign keys ${addedForeignKey.name} on ${table.name}`);
        createForeignKey(tableBuilder, addedForeignKey);
      }
      for (const addedIndex of table.indexes.added) {
        debug$2(`Creating index ${addedIndex.name} on ${table.name}`);
        createIndex(tableBuilder, addedIndex);
      }
    });
  };
  const dropTable = (schemaBuilder, table) => {
    if (!db.config.settings.forceMigration) {
      return;
    }
    return schemaBuilder.dropTableIfExists(table.name);
  };
  const createTableForeignKeys = async (schemaBuilder, table) => {
    await schemaBuilder.table(table.name, (tableBuilder) => {
      (table.foreignKeys || []).forEach((foreignKey) => createForeignKey(tableBuilder, foreignKey));
    });
  };
  const dropTableForeignKeys = async (schemaBuilder, table) => {
    if (!db.config.settings.forceMigration) {
      return;
    }
    await schemaBuilder.table(table.name, (tableBuilder) => {
      (table.foreignKeys || []).forEach((foreignKey) => dropForeignKey(tableBuilder, foreignKey));
    });
  };
  return {
    createTable: createTable2,
    alterTable,
    dropTable,
    createTableForeignKeys,
    dropTableForeignKeys
  };
};
const RESERVED_TABLE_NAMES = [
  "strapi_migrations",
  "strapi_migrations_internal",
  "strapi_database_schema"
];
const statuses = {
  CHANGED: "CHANGED",
  UNCHANGED: "UNCHANGED"
};
const helpers = {
  hasTable(schema, tableName) {
    return schema.tables.findIndex((table) => table.name === tableName) !== -1;
  },
  findTable(schema, tableName) {
    return schema.tables.find((table) => table.name === tableName);
  },
  hasColumn(table, columnName) {
    return table.columns.findIndex((column) => column.name === columnName) !== -1;
  },
  findColumn(table, columnName) {
    return table.columns.find((column) => column.name === columnName);
  },
  hasIndex(table, columnName) {
    return table.indexes.findIndex((column) => column.name === columnName) !== -1;
  },
  findIndex(table, columnName) {
    return table.indexes.find((column) => column.name === columnName);
  },
  hasForeignKey(table, columnName) {
    return table.foreignKeys.findIndex((column) => column.name === columnName) !== -1;
  },
  findForeignKey(table, columnName) {
    return table.foreignKeys.find((column) => column.name === columnName);
  }
};
const createSchemaDiff = (db) => {
  const hasChangedStatus = (diff) => diff.status === statuses.CHANGED;
  const diffIndexes = (oldIndex, index2) => {
    const changes = [];
    if (_.xor(oldIndex.columns, index2.columns).length > 0) {
      changes.push("columns");
    }
    if (oldIndex.type && index2.type && _.toLower(oldIndex.type) !== _.toLower(index2.type)) {
      changes.push("type");
    }
    return {
      status: changes.length > 0 ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        name: index2.name,
        object: index2
      }
    };
  };
  const diffForeignKeys = (oldForeignKey, foreignKey) => {
    const changes = [];
    if (_.difference(oldForeignKey.columns, foreignKey.columns).length > 0) {
      changes.push("columns");
    }
    if (_.difference(oldForeignKey.referencedColumns, foreignKey.referencedColumns).length > 0) {
      changes.push("referencedColumns");
    }
    if (oldForeignKey.referencedTable !== foreignKey.referencedTable) {
      changes.push("referencedTable");
    }
    if (_.isNil(oldForeignKey.onDelete) || _.toUpper(oldForeignKey.onDelete) === "NO ACTION") {
      if (!_.isNil(foreignKey.onDelete) && _.toUpper(oldForeignKey.onDelete ?? "") !== "NO ACTION") {
        changes.push("onDelete");
      }
    } else if (_.toUpper(oldForeignKey.onDelete) !== _.toUpper(foreignKey.onDelete ?? "")) {
      changes.push("onDelete");
    }
    if (_.isNil(oldForeignKey.onUpdate) || _.toUpper(oldForeignKey.onUpdate) === "NO ACTION") {
      if (!_.isNil(foreignKey.onUpdate) && _.toUpper(oldForeignKey.onUpdate ?? "") !== "NO ACTION") {
        changes.push("onUpdate");
      }
    } else if (_.toUpper(oldForeignKey.onUpdate) !== _.toUpper(foreignKey.onUpdate ?? "")) {
      changes.push("onUpdate");
    }
    return {
      status: changes.length > 0 ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        name: foreignKey.name,
        object: foreignKey
      }
    };
  };
  const diffDefault = (oldColumn, column) => {
    const oldDefaultTo = oldColumn.defaultTo;
    const { defaultTo } = column;
    if (oldDefaultTo === null || _.toLower(oldDefaultTo) === "null") {
      return _.isNil(defaultTo) || _.toLower(defaultTo) === "null";
    }
    return _.toLower(oldDefaultTo) === _.toLower(column.defaultTo) || _.toLower(oldDefaultTo) === _.toLower(`'${column.defaultTo}'`);
  };
  const diffColumns = (oldColumn, column) => {
    const changes = [];
    const isIgnoredType = ["increments"].includes(column.type);
    const oldType = oldColumn.type;
    const type = db.dialect.getSqlType(column.type);
    if (oldType !== type && !isIgnoredType) {
      changes.push("type");
    }
    if (oldColumn.notNullable !== column.notNullable) {
      changes.push("notNullable");
    }
    const hasSameDefault = diffDefault(oldColumn, column);
    if (!hasSameDefault) {
      changes.push("defaultTo");
    }
    if (oldColumn.unsigned !== column.unsigned && db.dialect.supportsUnsigned()) {
      changes.push("unsigned");
    }
    return {
      status: changes.length > 0 ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        name: column.name,
        object: column
      }
    };
  };
  const diffTableColumns = (diffCtx) => {
    const { databaseTable, userSchemaTable, previousTable } = diffCtx;
    const addedColumns = [];
    const updatedColumns = [];
    const unchangedColumns = [];
    const removedColumns = [];
    for (const userSchemaColumn of userSchemaTable.columns) {
      const databaseColumn = helpers.findColumn(databaseTable, userSchemaColumn.name);
      if (databaseColumn) {
        const { status, diff } = diffColumns(databaseColumn, userSchemaColumn);
        if (status === statuses.CHANGED) {
          updatedColumns.push(diff);
        } else {
          unchangedColumns.push(databaseColumn);
        }
      } else {
        addedColumns.push(userSchemaColumn);
      }
    }
    for (const databaseColumn of databaseTable.columns) {
      if (!helpers.hasColumn(userSchemaTable, databaseColumn.name) && previousTable && helpers.hasColumn(previousTable, databaseColumn.name)) {
        removedColumns.push(databaseColumn);
      }
    }
    const hasChanged = [addedColumns, updatedColumns, removedColumns].some((arr) => arr.length > 0);
    return {
      status: hasChanged ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        added: addedColumns,
        updated: updatedColumns,
        unchanged: unchangedColumns,
        removed: removedColumns
      }
    };
  };
  const diffTableIndexes = (diffCtx) => {
    const { databaseTable, userSchemaTable, previousTable } = diffCtx;
    const addedIndexes = [];
    const updatedIndexes = [];
    const unchangedIndexes = [];
    const removedIndexes = [];
    for (const userSchemaIndex of userSchemaTable.indexes) {
      const databaseIndex = helpers.findIndex(databaseTable, userSchemaIndex.name);
      if (databaseIndex) {
        const { status, diff } = diffIndexes(databaseIndex, userSchemaIndex);
        if (status === statuses.CHANGED) {
          updatedIndexes.push(diff);
        } else {
          unchangedIndexes.push(databaseIndex);
        }
      } else {
        addedIndexes.push(userSchemaIndex);
      }
    }
    for (const databaseIndex of databaseTable.indexes) {
      if (!helpers.hasIndex(userSchemaTable, databaseIndex.name) && previousTable && helpers.hasIndex(previousTable, databaseIndex.name)) {
        removedIndexes.push(databaseIndex);
      }
    }
    const hasChanged = [addedIndexes, updatedIndexes, removedIndexes].some((arr) => arr.length > 0);
    return {
      status: hasChanged ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        added: addedIndexes,
        updated: updatedIndexes,
        unchanged: unchangedIndexes,
        removed: removedIndexes
      }
    };
  };
  const diffTableForeignKeys = (diffCtx) => {
    const { databaseTable, userSchemaTable, previousTable } = diffCtx;
    const addedForeignKeys = [];
    const updatedForeignKeys = [];
    const unchangedForeignKeys = [];
    const removedForeignKeys = [];
    if (!db.dialect.usesForeignKeys()) {
      return {
        status: statuses.UNCHANGED,
        diff: {
          added: addedForeignKeys,
          updated: updatedForeignKeys,
          unchanged: unchangedForeignKeys,
          removed: removedForeignKeys
        }
      };
    }
    for (const userSchemaForeignKeys of userSchemaTable.foreignKeys) {
      const databaseForeignKeys = helpers.findForeignKey(databaseTable, userSchemaForeignKeys.name);
      if (databaseForeignKeys) {
        const { status, diff } = diffForeignKeys(databaseForeignKeys, userSchemaForeignKeys);
        if (status === statuses.CHANGED) {
          updatedForeignKeys.push(diff);
        } else {
          unchangedForeignKeys.push(databaseForeignKeys);
        }
      } else {
        addedForeignKeys.push(userSchemaForeignKeys);
      }
    }
    for (const databaseForeignKeys of databaseTable.foreignKeys) {
      if (!helpers.hasForeignKey(userSchemaTable, databaseForeignKeys.name) && previousTable && helpers.hasForeignKey(previousTable, databaseForeignKeys.name)) {
        removedForeignKeys.push(databaseForeignKeys);
      }
    }
    const hasChanged = [addedForeignKeys, updatedForeignKeys, removedForeignKeys].some(
      (arr) => arr.length > 0
    );
    return {
      status: hasChanged ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        added: addedForeignKeys,
        updated: updatedForeignKeys,
        unchanged: unchangedForeignKeys,
        removed: removedForeignKeys
      }
    };
  };
  const diffTables = (diffCtx) => {
    const { databaseTable } = diffCtx;
    const columnsDiff = diffTableColumns(diffCtx);
    const indexesDiff = diffTableIndexes(diffCtx);
    const foreignKeysDiff = diffTableForeignKeys(diffCtx);
    const hasChanged = [columnsDiff, indexesDiff, foreignKeysDiff].some(hasChangedStatus);
    return {
      status: hasChanged ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        name: databaseTable.name,
        indexes: indexesDiff.diff,
        foreignKeys: foreignKeysDiff.diff,
        columns: columnsDiff.diff
      }
    };
  };
  const diffSchemas = async (schemaDiffCtx) => {
    const { previousSchema, databaseSchema, userSchema } = schemaDiffCtx;
    const addedTables = [];
    const updatedTables = [];
    const unchangedTables = [];
    const removedTables = [];
    for (const userSchemaTable of userSchema.tables) {
      const databaseTable = helpers.findTable(databaseSchema, userSchemaTable.name);
      const previousTable = previousSchema && helpers.findTable(previousSchema, userSchemaTable.name);
      if (databaseTable) {
        const { status, diff } = diffTables({
          previousTable,
          databaseTable,
          userSchemaTable
        });
        if (status === statuses.CHANGED) {
          updatedTables.push(diff);
        } else {
          unchangedTables.push(databaseTable);
        }
      } else {
        addedTables.push(userSchemaTable);
      }
    }
    const parsePersistedTable = (persistedTable) => {
      if (typeof persistedTable === "string") {
        return persistedTable;
      }
      return persistedTable.name;
    };
    const persistedTables = helpers.hasTable(databaseSchema, "strapi_core_store_settings") ? (
      // TODO: replace with low level db query instead
      await strapi.store.get({
        type: "core",
        key: "persisted_tables"
      }) ?? []
    ) : [];
    const reservedTables = [...RESERVED_TABLE_NAMES, ...persistedTables.map(parsePersistedTable)];
    for (const databaseTable of databaseSchema.tables) {
      const isInUserSchema = helpers.hasTable(userSchema, databaseTable.name);
      const wasTracked = previousSchema && helpers.hasTable(previousSchema, databaseTable.name);
      const isReserved = reservedTables.includes(databaseTable.name);
      if (!isInUserSchema && !wasTracked) {
        continue;
      }
      if (!isInUserSchema && wasTracked && !isReserved) {
        const dependencies = persistedTables.filter((table) => {
          const dependsOn = table?.dependsOn;
          if (!_.isArray(dependsOn)) {
            return;
          }
          return dependsOn.some((table2) => table2.name === databaseTable.name);
        }).map((dependsOnTable) => {
          return databaseSchema.tables.find(
            (databaseTable2) => databaseTable2.name === dependsOnTable.name
          );
        }).filter((table) => !_.isNil(table));
        removedTables.push(databaseTable, ...dependencies);
      }
    }
    const hasChanged = [addedTables, updatedTables, removedTables].some((arr) => arr.length > 0);
    return {
      status: hasChanged ? statuses.CHANGED : statuses.UNCHANGED,
      diff: {
        tables: {
          added: addedTables,
          updated: updatedTables,
          unchanged: unchangedTables,
          removed: removedTables
        }
      }
    };
  };
  return {
    diff: diffSchemas
  };
};
const TABLE_NAME = "strapi_database_schema";
const createSchemaStorage = (db) => {
  const hasSchemaTable = () => db.getSchemaConnection().hasTable(TABLE_NAME);
  const createSchemaTable = () => {
    return db.getSchemaConnection().createTable(TABLE_NAME, (t) => {
      t.increments("id");
      t.json("schema");
      t.datetime("time", { useTz: false });
      t.string("hash");
    });
  };
  const checkTableExists = async () => {
    if (!await hasSchemaTable()) {
      await createSchemaTable();
    }
  };
  return {
    async read() {
      await checkTableExists();
      const res = await db.getConnection().select("*").from(TABLE_NAME).orderBy("time", "DESC").first();
      if (!res) {
        return null;
      }
      const parsedSchema = typeof res.schema === "object" ? res.schema : JSON.parse(res.schema);
      return {
        ...res,
        schema: parsedSchema
      };
    },
    hashSchema(schema) {
      return crypto.createHash("md5").update(JSON.stringify(schema)).digest("hex");
    },
    async add(schema) {
      await checkTableExists();
      await db.getConnection(TABLE_NAME).delete();
      const time = /* @__PURE__ */ new Date();
      await db.getConnection().insert({
        schema: JSON.stringify(schema),
        hash: this.hashSchema(schema),
        time
      }).into(TABLE_NAME);
    },
    async clear() {
      await checkTableExists();
      await db.getConnection(TABLE_NAME).truncate();
    }
  };
};
const SCALAR_TYPES = [
  "increments",
  "password",
  "email",
  "string",
  "uid",
  "richtext",
  "text",
  "json",
  "enumeration",
  "integer",
  "biginteger",
  "float",
  "decimal",
  "date",
  "time",
  "datetime",
  "timestamp",
  "boolean",
  "blocks"
];
const STRING_TYPES = ["string", "text", "uid", "email", "enumeration", "richtext"];
const NUMBER_TYPES = ["biginteger", "integer", "decimal", "float"];
const isString = (type) => STRING_TYPES.includes(type);
const isNumber = (type) => NUMBER_TYPES.includes(type);
const isScalar = (type) => SCALAR_TYPES.includes(type);
const isRelation = (type) => type === "relation";
const isScalarAttribute = (attribute) => isScalar(attribute.type);
const isRelationalAttribute = (attribute) => isRelation(attribute.type);
function createHash(data, len) {
  if (!isInteger(len) || len <= 0) {
    throw new Error(`createHash length must be a positive integer, received ${len}`);
  }
  const hash = crypto$1.createHash("shake256", { outputLength: Math.ceil(len / 2) }).update(data);
  return hash.digest("hex").substring(0, len);
}
const IDENTIFIER_MAX_LENGTH = 55;
class Identifiers {
  ID_COLUMN = "id";
  ORDER_COLUMN = "order";
  FIELD_COLUMN = "field";
  HASH_LENGTH = 5;
  HASH_SEPARATOR = "";
  // no separator is needed, we will just attach hash directly to shortened name
  IDENTIFIER_SEPARATOR = "_";
  MIN_TOKEN_LENGTH = 3;
  // the min characters required at the beginning of a name part
  // Fixed compression map for suffixes and prefixes
  #replacementMap = {
    links: "lnk",
    order_inv_fk: "oifk",
    order: "ord",
    morphs: "mph",
    index: "idx",
    inv_fk: "ifk",
    order_fk: "ofk",
    id_column_index: "idix",
    order_index: "oidx",
    unique: "uq",
    primary: "pk"
  };
  #options;
  constructor(options) {
    this.#options = options;
  }
  get replacementMap() {
    return this.#replacementMap;
  }
  get options() {
    return this.#options;
  }
  mapshortNames = (name) => {
    if (name in this.replacementMap) {
      return this.replacementMap[name];
    }
    return void 0;
  };
  // Generic name handler that must be used by all helper functions
  /**
   * TODO: we should be requiring snake_case inputs for all names here, but we
   * aren't and it will require some refactoring to make it work. Currently if
   * we get names 'myModel' and 'my_model' they would be converted to the same
   * final string my_model which generally works but is not entirely safe
   * */
  getName = (names, options) => {
    const tokens = _.castArray(names).map((name) => {
      return {
        name,
        compressible: true
      };
    });
    if (options?.suffix) {
      tokens.push({
        name: options.suffix,
        compressible: false,
        shortName: this.mapshortNames(options.suffix)
      });
    }
    if (options?.prefix) {
      tokens.unshift({
        name: options.prefix,
        compressible: false,
        shortName: this.mapshortNames(options.prefix)
      });
    }
    return this.getNameFromTokens(tokens);
  };
  /**
   * TABLES
   */
  getTableName = (name, options) => {
    return this.getName(name, options);
  };
  getJoinTableName = (collectionName, attributeName, options) => {
    return this.getName([collectionName, attributeName], {
      suffix: "links",
      ...options
    });
  };
  getMorphTableName = (collectionName, attributeName, options) => {
    return this.getName([snakeCase(collectionName), snakeCase(attributeName)], {
      suffix: "morphs",
      ...options
    });
  };
  /**
   * COLUMNS
   */
  getColumnName = (attributeName, options) => {
    return this.getName(attributeName, options);
  };
  getJoinColumnAttributeIdName = (attributeName, options) => {
    return this.getName(attributeName, { suffix: "id", ...options });
  };
  getInverseJoinColumnAttributeIdName = (attributeName, options) => {
    return this.getName(snakeCase(attributeName), { suffix: "id", prefix: "inv", ...options });
  };
  getOrderColumnName = (singularName, options) => {
    return this.getName(singularName, { suffix: "order", ...options });
  };
  getInverseOrderColumnName = (singularName, options) => {
    return this.getName(singularName, {
      suffix: "order",
      prefix: "inv",
      ...options
    });
  };
  /**
   * Morph Join Tables
   */
  getMorphColumnJoinTableIdName = (singularName, options) => {
    return this.getName(snakeCase(singularName), { suffix: "id", ...options });
  };
  getMorphColumnAttributeIdName = (attributeName, options) => {
    return this.getName(snakeCase(attributeName), { suffix: "id", ...options });
  };
  getMorphColumnTypeName = (attributeName, options) => {
    return this.getName(snakeCase(attributeName), { suffix: "type", ...options });
  };
  /**
   * INDEXES
   * Note that these methods are generally used to reference full table names + attribute(s), which
   * may already be shortened strings rather than individual parts.
   * That is fine and expected to compress the previously incompressible parts of those strings,
   * because in these cases the relevant information is the table name and we can't really do
   * any better; shortening the individual parts again might make it even more confusing.
   *
   * So for example, the fk for the table `mytable_myattr4567d_localizations` will become
   * mytable_myattr4567d_loc63bf2_fk
   */
  // base index types
  getIndexName = (names, options) => {
    return this.getName(names, { suffix: "index", ...options });
  };
  getFkIndexName = (names, options) => {
    return this.getName(names, { suffix: "fk", ...options });
  };
  getUniqueIndexName = (names, options) => {
    return this.getName(names, { suffix: "unique", ...options });
  };
  getPrimaryIndexName = (names, options) => {
    return this.getName(names, { suffix: "primary", ...options });
  };
  // custom index types
  getInverseFkIndexName = (names, options) => {
    return this.getName(names, { suffix: "inv_fk", ...options });
  };
  getOrderFkIndexName = (names, options) => {
    return this.getName(names, { suffix: "order_fk", ...options });
  };
  getOrderInverseFkIndexName = (names, options) => {
    return this.getName(names, { suffix: "order_inv_fk", ...options });
  };
  getIdColumnIndexName = (names, options) => {
    return this.getName(names, { suffix: "id_column_index", ...options });
  };
  getOrderIndexName = (names, options) => {
    return this.getName(names, { suffix: "order_index", ...options });
  };
  /**
   * Generates a string with a max length, appending a hash at the end if necessary to keep it unique
   *
   * @example
   * // if we have strings such as "longstring1" and "longstring2" with a max length of 9,
   * // we don't want to end up with "longstrin" and "longstrin"
   * // we want something such as    "longs0b23" and "longs953f"
   * const token1 = generateToken("longstring1", 9); // "longs0b23"
   * const token2 = generateToken("longstring2", 9); // "longs953f"
   *
   * @param name - The base name
   * @param len - The desired length of the token.
   * @returns The generated token with hash.
   * @throws Error if the length is not a positive integer, or if the length is too short for the token.
   * @internal
   */
  getShortenedName = (name, len) => {
    if (!isInteger(len) || len <= 0) {
      throw new Error(`tokenWithHash length must be a positive integer, received ${len}`);
    }
    if (name.length <= len) {
      return name;
    }
    if (len < this.MIN_TOKEN_LENGTH + this.HASH_LENGTH) {
      throw new Error(
        `length for part of identifier too short, minimum is hash length (${this.HASH_LENGTH}) plus min token length (${this.MIN_TOKEN_LENGTH}), received ${len} for token ${name}`
      );
    }
    const availableLength = len - this.HASH_LENGTH - this.HASH_SEPARATOR.length;
    if (availableLength < this.MIN_TOKEN_LENGTH) {
      throw new Error(
        `length for part of identifier minimum is less than min token length (${this.MIN_TOKEN_LENGTH}), received ${len} for token ${name}`
      );
    }
    return `${name.substring(0, availableLength)}${this.HASH_SEPARATOR}${createHash(
      name,
      this.HASH_LENGTH
    )}`;
  };
  /**
   * Constructs a name from an array of name tokens within a specified maximum length. It ensures the final name does not exceed
   * this limit by selectively compressing tokens marked as compressible. If the name exceeds the maximum length and cannot be
   * compressed sufficiently, an error is thrown. This function supports dynamic adjustment of token lengths to fit within the
   * maxLength constraint (that is, it will always make use of all available space), while also ensuring the preservation of
   * incompressible tokens.
   * @internal
   */
  getNameFromTokens = (nameTokens) => {
    const { maxLength } = this.options;
    if (!isInteger(maxLength) || maxLength < 0) {
      throw new Error("maxLength must be a positive integer or 0 (for unlimited length)");
    }
    const unshortenedName = nameTokens.map((token) => {
      return token.name;
    }).join(this.IDENTIFIER_SEPARATOR);
    if (maxLength === 0) {
      this.setUnshortenedName(unshortenedName, unshortenedName);
      return unshortenedName;
    }
    const fullLengthName = nameTokens.map((token) => {
      if (token.compressible) {
        return token.name;
      }
      return token.shortName ?? token.name;
    }).join(this.IDENTIFIER_SEPARATOR);
    if (fullLengthName.length <= maxLength) {
      this.setUnshortenedName(fullLengthName, unshortenedName);
      return fullLengthName;
    }
    const [compressible, incompressible] = partition(
      (token) => token.compressible,
      nameTokens
    );
    const totalIncompressibleLength = sumBy(
      (token) => token.compressible === false && token.shortName !== void 0 ? token.shortName.length : token.name.length
    )(incompressible);
    const totalSeparatorsLength = nameTokens.length * this.IDENTIFIER_SEPARATOR.length - 1;
    const available = maxLength - totalIncompressibleLength - totalSeparatorsLength;
    const availablePerToken = Math.floor(available / compressible.length);
    if (totalIncompressibleLength + totalSeparatorsLength > maxLength || availablePerToken < this.MIN_TOKEN_LENGTH) {
      throw new Error("Maximum length is too small to accommodate all tokens");
    }
    let surplus = available % compressible.length;
    const minHashedLength = this.HASH_LENGTH + this.HASH_SEPARATOR.length + this.MIN_TOKEN_LENGTH;
    const totalLength = nameTokens.reduce(
      (total, token) => {
        if (token.compressible) {
          if (token.name.length < availablePerToken) {
            return total + token.name.length;
          }
          return total + minHashedLength;
        }
        const tokenName = token.shortName ?? token.name;
        return total + tokenName.length;
      },
      nameTokens.length * this.IDENTIFIER_SEPARATOR.length - 1
    );
    if (maxLength < totalLength) {
      throw new Error("Maximum length is too small to accommodate all tokens");
    }
    let deficits = [];
    compressible.forEach((token) => {
      const actualLength = token.name.length;
      if (actualLength < availablePerToken) {
        surplus += availablePerToken - actualLength;
        token.allocatedLength = actualLength;
      } else {
        token.allocatedLength = availablePerToken;
        deficits.push(token);
      }
    });
    function filterAndIncreaseLength(token) {
      if (token.allocatedLength < token.name.length && surplus > 0) {
        token.allocatedLength += 1;
        surplus -= 1;
        return token.allocatedLength < token.name.length;
      }
      return false;
    }
    let previousSurplus = surplus + 1;
    while (surplus > 0 && deficits.length > 0) {
      deficits = deficits.filter((token) => filterAndIncreaseLength(token));
      if (surplus === previousSurplus) {
        break;
      }
      previousSurplus = surplus;
    }
    const shortenedName = nameTokens.map((token) => {
      if (token.compressible && "allocatedLength" in token && token.allocatedLength !== void 0) {
        return this.getShortenedName(token.name, token.allocatedLength);
      }
      if (token.compressible === false && token.shortName) {
        return token.shortName;
      }
      return token.name;
    }).join(this.IDENTIFIER_SEPARATOR);
    if (shortenedName.length > maxLength) {
      throw new Error(
        `name shortening failed to generate a name of the correct maxLength; name ${shortenedName}`
      );
    }
    this.setUnshortenedName(shortenedName, unshortenedName);
    return shortenedName;
  };
  // We need to be able to find the full-length name for any shortened name, primarily for migration purposes
  // Therefore we store every name that passes through so we can retrieve the original later
  nameMap = /* @__PURE__ */ new Map();
  getUnshortenedName = (shortName) => {
    return this.nameMap.get(this.serializeKey(shortName)) ?? shortName;
  };
  setUnshortenedName = (shortName, fullName) => {
    if (this.nameMap.get(this.serializeKey(shortName)) && shortName === fullName) {
      return;
    }
    this.nameMap.set(this.serializeKey(shortName), fullName);
  };
  serializeKey = (shortName) => {
    return `${shortName}.${this.options.maxLength}`;
  };
}
const identifiers = new Identifiers({ maxLength: IDENTIFIER_MAX_LENGTH });
const createColumn = (name, attribute) => {
  const { type, args = [], ...opts } = getColumnType(attribute);
  return {
    name: identifiers.getName(name),
    type,
    args,
    defaultTo: null,
    notNullable: false,
    unsigned: false,
    ...opts,
    ..."column" in attribute ? attribute.column ?? {} : {}
  };
};
const createTable = (meta) => {
  const table = {
    name: meta.tableName,
    indexes: meta.indexes || [],
    foreignKeys: meta.foreignKeys || [],
    columns: []
  };
  for (const key of Object.keys(meta.attributes)) {
    const attribute = meta.attributes[key];
    if (attribute.type === "relation") {
      if ("morphColumn" in attribute && attribute.morphColumn && attribute.owner) {
        const { idColumn, typeColumn } = attribute.morphColumn;
        const idColumnName = identifiers.getName(idColumn.name);
        const typeColumnName = identifiers.getName(typeColumn.name);
        table.columns.push(
          createColumn(idColumnName, {
            type: "integer",
            column: {
              unsigned: true
            }
          })
        );
        table.columns.push(createColumn(typeColumnName, { type: "string" }));
      } else if ("joinColumn" in attribute && attribute.joinColumn && attribute.owner && attribute.joinColumn.referencedTable) {
        const {
          name: columnNameFull,
          referencedColumn,
          referencedTable,
          columnType = "integer"
        } = attribute.joinColumn;
        const columnName = identifiers.getName(columnNameFull);
        const column = createColumn(columnName, {
          // TODO: find the column type automatically, or allow passing all the column params
          type: columnType,
          column: {
            unsigned: true
          }
        });
        table.columns.push(column);
        const fkName = identifiers.getFkIndexName([table.name, columnName]);
        table.foreignKeys.push({
          name: fkName,
          columns: [column.name],
          referencedTable,
          referencedColumns: [referencedColumn],
          // NOTE: could allow configuration
          onDelete: "SET NULL"
        });
        table.indexes.push({
          name: fkName,
          columns: [column.name]
        });
      }
    } else if (isScalarAttribute(attribute)) {
      const columnName = identifiers.getName(attribute.columnName || key);
      const column = createColumn(columnName, attribute);
      if (column.unique) {
        table.indexes.push({
          type: "unique",
          name: identifiers.getUniqueIndexName([table.name, column.name]),
          columns: [columnName]
        });
      }
      if (column.primary) {
        table.indexes.push({
          type: "primary",
          name: identifiers.getPrimaryIndexName([table.name, column.name]),
          columns: [columnName]
        });
      }
      table.columns.push(column);
    }
  }
  return table;
};
const getColumnType = (attribute) => {
  if ("columnType" in attribute && attribute.columnType) {
    return attribute.columnType;
  }
  switch (attribute.type) {
    case "increments": {
      return {
        type: "increments",
        args: [{ primary: true, primaryKey: true }],
        notNullable: true
      };
    }
    case "password":
    case "email":
    case "string":
    case "enumeration": {
      return { type: "string" };
    }
    case "uid": {
      return {
        type: "string"
      };
    }
    case "richtext":
    case "text": {
      return {
        type: "text",
        args: ["longtext"]
      };
    }
    case "blocks":
    case "json": {
      return { type: "jsonb" };
    }
    case "integer": {
      return { type: "integer" };
    }
    case "biginteger": {
      return { type: "bigInteger" };
    }
    case "float": {
      return { type: "double" };
    }
    case "decimal": {
      return { type: "decimal", args: [10, 2] };
    }
    case "date": {
      return { type: "date" };
    }
    case "time": {
      return { type: "time", args: [{ precision: 3 }] };
    }
    case "datetime": {
      return {
        type: "datetime",
        args: [
          {
            useTz: false,
            precision: 6
          }
        ]
      };
    }
    case "timestamp": {
      return {
        type: "timestamp",
        args: [
          {
            useTz: false,
            precision: 6
          }
        ]
      };
    }
    case "boolean": {
      return { type: "boolean" };
    }
    default: {
      throw new Error(`Unknown type ${attribute.type}`);
    }
  }
};
const metadataToSchema = (metadata) => {
  const schema = {
    tables: []
  };
  metadata.forEach((metadata2) => {
    schema.tables.push(createTable(metadata2));
  });
  return schema;
};
const debug$1 = createDebug("strapi::database");
const createSchemaProvider = (db) => {
  const state = {};
  return {
    get schema() {
      if (!state.schema) {
        debug$1("Converting metadata to database schema");
        state.schema = metadataToSchema(db.metadata);
      }
      return state.schema;
    },
    builder: createSchemaBuilder(db),
    schemaDiff: createSchemaDiff(db),
    schemaStorage: createSchemaStorage(db),
    /**
     * Drops the database schema
     */
    async drop() {
      debug$1("Dropping database schema");
      const DBSchema = await db.dialect.schemaInspector.getSchema();
      await this.builder.dropSchema(DBSchema);
    },
    /**
     * Creates the database schema
     */
    async create() {
      debug$1("Created database schema");
      await this.builder.createSchema(this.schema);
    },
    /**
     * Resets the database schema
     */
    async reset() {
      debug$1("Resetting database schema");
      await this.drop();
      await this.create();
    },
    async syncSchema() {
      debug$1("Synchronizing database schema");
      const databaseSchema = await db.dialect.schemaInspector.getSchema();
      const storedSchema = await this.schemaStorage.read();
      const { status, diff } = await this.schemaDiff.diff({
        previousSchema: storedSchema?.schema,
        databaseSchema,
        userSchema: this.schema
      });
      if (status === "CHANGED") {
        await this.builder.updateSchema(diff);
      }
      await this.schemaStorage.add(this.schema);
    },
    // TODO: support options to migrate softly or forcefully
    // TODO: support option to disable auto migration & run a CLI command instead to avoid doing it at startup
    // TODO: Allow keeping extra indexes / extra tables / extra columns (globally or on a per table basis)
    async sync() {
      if (await db.migrations.shouldRun()) {
        debug$1("Found migrations to run");
        await db.migrations.up();
        return this.syncSchema();
      }
      const oldSchema = await this.schemaStorage.read();
      if (!oldSchema) {
        debug$1("Schema not persisted yet");
        return this.syncSchema();
      }
      const { hash: oldHash } = oldSchema;
      const hash = await this.schemaStorage.hashSchema(this.schema);
      if (oldHash !== hash) {
        debug$1("Schema changed");
        return this.syncSchema();
      }
      debug$1("Schema unchanged");
    }
  };
};
const ID = identifiers.ID_COLUMN;
const ORDER = identifiers.ORDER_COLUMN;
const FIELD = identifiers.FIELD_COLUMN;
const hasInversedBy = (attr) => "inversedBy" in attr;
const hasMappedBy = (attr) => "mappedBy" in attr;
const isOneToAny = (attribute) => ["oneToOne", "oneToMany"].includes(attribute.relation);
const isManyToAny = (attribute) => ["manyToMany", "manyToOne"].includes(attribute.relation);
const isAnyToOne = (attribute) => ["oneToOne", "manyToOne"].includes(attribute.relation);
const isAnyToMany = (attribute) => ["oneToMany", "manyToMany"].includes(attribute.relation);
const isBidirectional = (attribute) => hasInversedBy(attribute) || hasMappedBy(attribute);
const isOwner = (attribute) => !isBidirectional(attribute) || hasInversedBy(attribute);
const shouldUseJoinTable = (attribute) => !("useJoinTable" in attribute) || attribute.useJoinTable !== false;
const hasOrderColumn = (attribute) => isAnyToMany(attribute);
const hasInverseOrderColumn = (attribute) => isBidirectional(attribute) && isManyToAny(attribute);
const createOneToOne = (attributeName, attribute, meta, metadata) => {
  if (isOwner(attribute)) {
    if (shouldUseJoinTable(attribute)) {
      createJoinTable(metadata, {
        attribute,
        attributeName,
        meta
      });
    } else {
      createJoinColumn(metadata, {
        attribute,
        attributeName,
        meta
      });
    }
  }
};
const createOneToMany = (attributeName, attribute, meta, metadata) => {
  if (shouldUseJoinTable(attribute) && !isBidirectional(attribute)) {
    createJoinTable(metadata, {
      attribute,
      attributeName,
      meta
    });
  } else if (isOwner(attribute)) {
    throw new Error("one side of a oneToMany cannot be the owner side in a bidirectional relation");
  }
};
const createManyToOne = (attributeName, attribute, meta, metadata) => {
  if (isBidirectional(attribute) && !isOwner(attribute)) {
    throw new Error("The many side of a manyToOne must be the owning side");
  }
  if (shouldUseJoinTable(attribute)) {
    createJoinTable(metadata, {
      attribute,
      attributeName,
      meta
    });
  } else {
    createJoinColumn(metadata, {
      attribute,
      attributeName,
      meta
    });
  }
};
const createManyToMany = (attributeName, attribute, meta, metadata) => {
  if (shouldUseJoinTable(attribute) && (!isBidirectional(attribute) || isOwner(attribute))) {
    createJoinTable(metadata, {
      attribute,
      attributeName,
      meta
    });
  }
};
const createMorphToOne = (attributeName, attribute) => {
  const idColumnName = identifiers.getJoinColumnAttributeIdName("target");
  const typeColumnName = identifiers.getMorphColumnTypeName("target");
  Object.assign(attribute, {
    owner: true,
    morphColumn: attribute.morphColumn ?? {
      typeColumn: {
        name: typeColumnName
      },
      idColumn: {
        name: idColumnName,
        referencedColumn: ID
      }
    }
  });
};
const createMorphToMany = (attributeName, attribute, meta, metadata) => {
  if ("joinTable" in attribute && attribute.joinTable && !attribute.joinTable.__internal__) {
    return;
  }
  const joinTableName = identifiers.getMorphTableName(meta.tableName, attributeName);
  const joinColumnName = identifiers.getMorphColumnJoinTableIdName(snakeCase(meta.singularName));
  const idColumnName = identifiers.getMorphColumnAttributeIdName(attributeName);
  const typeColumnName = identifiers.getMorphColumnTypeName(attributeName);
  const fkIndexName = identifiers.getFkIndexName(joinTableName);
  metadata.add({
    singularName: joinTableName,
    uid: joinTableName,
    tableName: joinTableName,
    attributes: {
      [ID]: {
        type: "increments"
      },
      [joinColumnName]: {
        type: "integer",
        column: {
          unsigned: true
        },
        // This must be set explicitly so that it is used instead of shortening the attribute name, which is already shortened
        columnName: joinColumnName
      },
      [idColumnName]: {
        type: "integer",
        column: {
          unsigned: true
        }
      },
      [typeColumnName]: {
        type: "string"
      },
      [FIELD]: {
        type: "string"
      },
      [ORDER]: {
        type: "float",
        column: {
          unsigned: true
        }
      }
    },
    indexes: [
      {
        name: fkIndexName,
        columns: [joinColumnName]
      },
      {
        name: identifiers.getOrderIndexName(joinTableName),
        columns: [ORDER]
      },
      {
        name: identifiers.getIdColumnIndexName(joinTableName),
        columns: [idColumnName]
      }
    ],
    foreignKeys: [
      {
        name: fkIndexName,
        columns: [joinColumnName],
        referencedColumns: [ID],
        referencedTable: meta.tableName,
        onDelete: "CASCADE"
      }
    ],
    lifecycles: {},
    columnToAttribute: {}
  });
  const joinTable = {
    __internal__: true,
    name: joinTableName,
    joinColumn: {
      name: joinColumnName,
      referencedColumn: ID
    },
    morphColumn: {
      typeColumn: {
        name: typeColumnName
      },
      idColumn: {
        name: idColumnName,
        referencedColumn: ID
      }
    },
    orderBy: {
      order: "asc"
    },
    pivotColumns: [joinColumnName, typeColumnName, idColumnName]
  };
  attribute.joinTable = joinTable;
};
const createMorphOne = (attributeName, attribute, meta, metadata) => {
  const targetMeta = metadata.get(attribute.target);
  if (!targetMeta) {
    throw new Error(`Morph target not found. Looking for ${attribute.target}`);
  }
  if (attribute.morphBy && !_.has(attribute.morphBy, targetMeta.attributes)) {
    throw new Error(`Morph target attribute not found. Looking for ${attribute.morphBy}`);
  }
};
const createMorphMany = (attributeName, attribute, meta, metadata) => {
  const targetMeta = metadata.get(attribute.target);
  if (!targetMeta) {
    throw new Error(`Morph target not found. Looking for ${attribute.target}`);
  }
  if (attribute.morphBy && !_.has(attribute.morphBy, targetMeta.attributes)) {
    throw new Error(`Morph target attribute not found. Looking for ${attribute.morphBy}`);
  }
};
const createJoinColumn = (metadata, { attribute, attributeName }) => {
  const targetMeta = metadata.get(attribute.target);
  if (!targetMeta) {
    throw new Error(`Unknown target ${attribute.target}`);
  }
  const joinColumnName = identifiers.getJoinColumnAttributeIdName(snakeCase(attributeName));
  const joinColumn = {
    name: joinColumnName,
    referencedColumn: ID,
    referencedTable: targetMeta.tableName
  };
  if ("joinColumn" in attribute) {
    Object.assign(joinColumn, attribute.joinColumn);
  }
  Object.assign(attribute, { owner: true, joinColumn });
  if (isBidirectional(attribute)) {
    const inverseAttribute = targetMeta.attributes[attribute.inversedBy];
    Object.assign(inverseAttribute, {
      joinColumn: {
        name: joinColumn.referencedColumn,
        referencedColumn: joinColumnName
      }
    });
  }
};
const createJoinTable = (metadata, { attributeName, attribute, meta }) => {
  if (!shouldUseJoinTable(attribute)) {
    throw new Error("Attempted to create join table when useJoinTable is false");
  }
  const targetMeta = metadata.get(attribute.target);
  if (!targetMeta) {
    throw new Error(`Unknown target ${attribute.target}`);
  }
  if ("joinTable" in attribute && attribute.joinTable && !attribute.joinTable.__internal__) {
    return;
  }
  const joinTableName = identifiers.getJoinTableName(
    snakeCase(meta.tableName),
    snakeCase(attributeName)
  );
  const joinColumnName = identifiers.getJoinColumnAttributeIdName(snakeCase(meta.singularName));
  let inverseJoinColumnName = identifiers.getJoinColumnAttributeIdName(
    snakeCase(targetMeta.singularName)
  );
  if (joinColumnName === inverseJoinColumnName) {
    inverseJoinColumnName = identifiers.getInverseJoinColumnAttributeIdName(
      snakeCase(targetMeta.singularName)
    );
  }
  const orderColumnName = identifiers.getOrderColumnName(snakeCase(targetMeta.singularName));
  let inverseOrderColumnName = identifiers.getOrderColumnName(snakeCase(meta.singularName));
  if (attribute.relation === "manyToMany" && orderColumnName === inverseOrderColumnName) {
    inverseOrderColumnName = identifiers.getInverseOrderColumnName(snakeCase(meta.singularName));
  }
  const fkIndexName = identifiers.getFkIndexName(joinTableName);
  const invFkIndexName = identifiers.getInverseFkIndexName(joinTableName);
  const metadataSchema = {
    singularName: joinTableName,
    uid: joinTableName,
    tableName: joinTableName,
    attributes: {
      [ID]: {
        type: "increments"
      },
      [joinColumnName]: {
        type: "integer",
        column: {
          unsigned: true
        },
        // This must be set explicitly so that it is used instead of shortening the attribute name, which is already shortened
        columnName: joinColumnName
      },
      [inverseJoinColumnName]: {
        type: "integer",
        column: {
          unsigned: true
        },
        // This must be set explicitly so that it is used instead of shortening the attribute name, which is already shortened
        columnName: inverseJoinColumnName
      }
      // TODO: add extra pivot attributes -> user should use an intermediate entity
    },
    indexes: [
      {
        name: fkIndexName,
        columns: [joinColumnName]
      },
      {
        name: invFkIndexName,
        columns: [inverseJoinColumnName]
      },
      {
        name: identifiers.getUniqueIndexName(joinTableName),
        columns: [joinColumnName, inverseJoinColumnName],
        type: "unique"
      }
    ],
    foreignKeys: [
      {
        name: fkIndexName,
        columns: [joinColumnName],
        referencedColumns: [ID],
        referencedTable: meta.tableName,
        onDelete: "CASCADE"
      },
      {
        name: invFkIndexName,
        columns: [inverseJoinColumnName],
        referencedColumns: [ID],
        referencedTable: targetMeta.tableName,
        onDelete: "CASCADE"
      }
    ],
    lifecycles: {},
    columnToAttribute: {}
  };
  const joinTable = {
    __internal__: true,
    name: joinTableName,
    joinColumn: {
      name: joinColumnName,
      referencedColumn: ID,
      referencedTable: meta.tableName
    },
    inverseJoinColumn: {
      name: inverseJoinColumnName,
      referencedColumn: ID,
      referencedTable: targetMeta.tableName
    },
    pivotColumns: [joinColumnName, inverseJoinColumnName]
  };
  if (isAnyToMany(attribute)) {
    metadataSchema.attributes[orderColumnName] = {
      type: "float",
      column: {
        unsigned: true,
        defaultTo: null
      },
      columnName: orderColumnName
    };
    metadataSchema.indexes.push({
      name: identifiers.getOrderFkIndexName(joinTableName),
      columns: [orderColumnName]
    });
    joinTable.orderColumnName = orderColumnName;
    joinTable.orderBy = { [orderColumnName]: "asc" };
  }
  if (isBidirectional(attribute) && isManyToAny(attribute)) {
    metadataSchema.attributes[inverseOrderColumnName] = {
      type: "float",
      column: {
        unsigned: true,
        defaultTo: null
      },
      columnName: inverseOrderColumnName
    };
    metadataSchema.indexes.push({
      name: identifiers.getOrderInverseFkIndexName(joinTableName),
      columns: [inverseOrderColumnName]
    });
    joinTable.inverseOrderColumnName = inverseOrderColumnName;
  }
  metadata.add(metadataSchema);
  attribute.joinTable = joinTable;
  if (isBidirectional(attribute)) {
    const inverseAttribute = attribute.inversedBy ? targetMeta.attributes[attribute.inversedBy] : null;
    if (!inverseAttribute) {
      throw new Error(
        `inversedBy attribute ${attribute.inversedBy} not found target ${targetMeta.uid}`
      );
    }
    if (inverseAttribute.type !== "relation") {
      throw new Error(
        `inversedBy attribute ${attribute.inversedBy} targets non relational attribute in ${targetMeta.uid}`
      );
    }
    inverseAttribute.joinTable = {
      __internal__: true,
      name: joinTableName,
      joinColumn: joinTable.inverseJoinColumn,
      inverseJoinColumn: joinTable.joinColumn,
      pivotColumns: joinTable.pivotColumns
    };
    if (isManyToAny(attribute)) {
      inverseAttribute.joinTable.orderColumnName = inverseOrderColumnName;
      inverseAttribute.joinTable.orderBy = { [inverseOrderColumnName]: "asc" };
    }
    if (isAnyToMany(attribute)) {
      inverseAttribute.joinTable.inverseOrderColumnName = orderColumnName;
    }
  }
};
const createRelation = (attributeName, attribute, meta, metadata) => {
  switch (attribute.relation) {
    case "oneToOne":
      return createOneToOne(attributeName, attribute, meta, metadata);
    case "oneToMany":
      return createOneToMany(attributeName, attribute, meta, metadata);
    case "manyToOne":
      return createManyToOne(attributeName, attribute, meta, metadata);
    case "manyToMany":
      return createManyToMany(attributeName, attribute, meta, metadata);
    case "morphToOne":
      return createMorphToOne(attributeName, attribute);
    case "morphToMany":
      return createMorphToMany(attributeName, attribute, meta, metadata);
    case "morphOne":
      return createMorphOne(attributeName, attribute, meta, metadata);
    case "morphMany":
      return createMorphMany(attributeName, attribute, meta, metadata);
    default: {
      throw new Error(`Unknown relation`);
    }
  }
};
class Metadata extends Map {
  // TODO: we expose the global identifiers in this way so that in the future we can instantiate our own
  // However, it should NOT be done until all the methods used by metadata can be part of this metadata object
  // and access this one; currently they all access the global identifiers directly.
  get identifiers() {
    return identifiers;
  }
  get(key) {
    if (!super.has(key)) {
      throw new Error(`Metadata for "${key}" not found`);
    }
    return super.get(key);
  }
  add(meta) {
    return this.set(meta.uid, meta);
  }
  /**
   * Validate the DB metadata, throwing an error if a duplicate DB table name is detected
   */
  validate() {
    const seenTables = /* @__PURE__ */ new Map();
    for (const meta of this.values()) {
      if (seenTables.get(meta.tableName)) {
        throw new Error(
          `DB table "${meta.tableName}" already exists. Change the collectionName of the related content type.`
        );
      }
      seenTables.set(meta.tableName, true);
    }
  }
  loadModels(models) {
    for (const model of cloneDeep(models ?? [])) {
      const tableName = identifiers.getTableName(model.tableName);
      this.add({
        ...model,
        tableName,
        attributes: {
          ...model.attributes
        },
        lifecycles: model.lifecycles ?? {},
        indexes: model.indexes ?? [],
        foreignKeys: model.foreignKeys ?? [],
        columnToAttribute: {}
      });
    }
    for (const meta of this.values()) {
      for (const [attributeName, attribute] of Object.entries(meta.attributes)) {
        try {
          if (attribute.unstable_virtual) {
            continue;
          }
          if (isRelationalAttribute(attribute)) {
            createRelation(attributeName, attribute, meta, this);
            continue;
          }
          createAttribute(attributeName, attribute);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(
              `Error on attribute ${attributeName} in model ${meta.singularName}(${meta.uid}): ${error.message}`
            );
          }
        }
      }
    }
    for (const meta of this.values()) {
      const columnToAttribute = Object.keys(meta.attributes).reduce((acc, key) => {
        const attribute = meta.attributes[key];
        if ("columnName" in attribute) {
          return Object.assign(acc, { [attribute.columnName || key]: key });
        }
        return Object.assign(acc, { [key]: key });
      }, {});
      meta.columnToAttribute = columnToAttribute;
    }
    this.validate();
  }
}
const createAttribute = (attributeName, attribute) => {
  if ("columnName" in attribute && attribute.columnName) {
    return;
  }
  const columnName = identifiers.getColumnName(snakeCase(attributeName));
  Object.assign(attribute, { columnName });
};
const createMetadata = (models) => {
  const metadata = new Metadata();
  if (models.length) {
    metadata.loadModels(models);
  }
  return metadata;
};
class Field {
  config;
  constructor(config) {
    this.config = config;
  }
  toDB(value) {
    return value;
  }
  fromDB(value) {
    return value;
  }
}
class StringField extends Field {
  toDB(value) {
    return toString(value);
  }
  fromDB(value) {
    return toString(value);
  }
}
class JSONField extends Field {
  toDB(value) {
    if (value == null) {
      return null;
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  }
  fromDB(value) {
    try {
      if (typeof value === "string") {
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === "string") {
          return JSON.parse(parsedValue);
        }
        return parsedValue;
      }
    } catch (error) {
      return value;
    }
    return value;
  }
}
class BigIntegerField extends StringField {
}
class NumberField extends Field {
  toDB(value) {
    const numberValue = toNumber(value);
    if (Number.isNaN(numberValue)) {
      throw new Error(`Expected a valid Number, got ${value}`);
    }
    return numberValue;
  }
  fromDB(value) {
    return toNumber(value);
  }
}
const isDate = (value) => {
  return dateFns.isDate(value);
};
const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const PARTIAL_DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/g;
const TIME_REGEX = /^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]{1,3})?$/;
const parseDateTimeOrTimestamp = (value) => {
  if (isDate(value)) {
    return value;
  }
  try {
    const date = dateFns.parseISO(toString(value));
    if (dateFns.isValid(date)) {
      return date;
    }
    const milliUnixDate = dateFns.parse(toString(value), "T", /* @__PURE__ */ new Date());
    if (dateFns.isValid(milliUnixDate)) {
      return milliUnixDate;
    }
    throw new InvalidDateTimeError(`Invalid format, expected a timestamp or an ISO date`);
  } catch (error) {
    throw new InvalidDateTimeError(`Invalid format, expected a timestamp or an ISO date`);
  }
};
const parseDate = (value) => {
  if (isDate(value)) {
    return dateFns.format(value, "yyyy-MM-dd");
  }
  const found = isString$1(value) ? value.match(PARTIAL_DATE_REGEX) || [] : [];
  const extractedValue = found[0];
  if (extractedValue && !DATE_REGEX.test(toString(value))) {
    process.emitWarning(
      `[deprecated] Using a date format other than YYYY-MM-DD will be removed in future versions. Date received: ${value}. Date stored: ${extractedValue}.`
    );
  }
  if (!extractedValue) {
    throw new InvalidDateError(`Invalid format, expected yyyy-MM-dd`);
  }
  const date = dateFns.parseISO(extractedValue);
  if (!dateFns.isValid(date)) {
    throw new InvalidDateError(`Invalid date`);
  }
  return extractedValue;
};
const parseTime = (value) => {
  if (isDate(value)) {
    return dateFns.format(value, "HH:mm:ss.SSS");
  }
  if (typeof value !== "string") {
    throw new InvalidTimeError(`Expected a string, got a ${typeof value}`);
  }
  const result = value.match(TIME_REGEX);
  if (result === null) {
    throw new InvalidTimeError("Invalid time format, expected HH:mm:ss.SSS");
  }
  const [, hours, minutes, seconds, fraction = ".000"] = result;
  const fractionPart = padCharsEnd("0", 3, fraction.slice(1));
  return `${hours}:${minutes}:${seconds}.${fractionPart}`;
};
class DateField extends Field {
  toDB(value) {
    return parseDate(value);
  }
  fromDB(value) {
    return value;
  }
}
class TimeField extends Field {
  toDB(value) {
    return parseTime(value);
  }
  fromDB(value) {
    return value;
  }
}
class DatetimeField extends Field {
  toDB(value) {
    return parseDateTimeOrTimestamp(value);
  }
  fromDB(value) {
    const cast = new Date(value);
    return dateFns.isValid(cast) ? cast.toISOString() : null;
  }
}
class TimestampField extends Field {
  toDB(value) {
    return parseDateTimeOrTimestamp(value);
  }
  fromDB(value) {
    const cast = new Date(value);
    return dateFns.isValid(cast) ? dateFns.format(cast, "T") : null;
  }
}
function isStringOrNumber(value) {
  return typeof value === "string" || typeof value === "number";
}
class BooleanField extends Field {
  toDB(value) {
    if (typeof value === "boolean") {
      return value;
    }
    if (isStringOrNumber(value) && ["true", "t", "1", 1].includes(value)) {
      return true;
    }
    if (isStringOrNumber(value) && ["false", "f", "0", 0].includes(value)) {
      return false;
    }
    return Boolean(value);
  }
  fromDB(value) {
    if (typeof value === "boolean") {
      return value;
    }
    const strVal = toString(value);
    if (strVal === "1") {
      return true;
    }
    if (strVal === "0") {
      return false;
    }
    return null;
  }
}
const typeToFieldMap = {
  increments: Field,
  password: StringField,
  email: StringField,
  string: StringField,
  uid: StringField,
  richtext: StringField,
  text: StringField,
  enumeration: StringField,
  json: JSONField,
  biginteger: BigIntegerField,
  integer: NumberField,
  float: NumberField,
  decimal: NumberField,
  date: DateField,
  time: TimeField,
  datetime: DatetimeField,
  timestamp: TimestampField,
  boolean: BooleanField,
  blocks: JSONField
};
const createField = (attribute) => {
  const { type } = attribute;
  if (_.has(type, typeToFieldMap)) {
    return new typeToFieldMap[type]({});
  }
  throw new Error(`Undefined field for type ${type}`);
};
const storage = new AsyncLocalStorage();
const transactionCtx = {
  async run(trx, cb) {
    const store = storage.getStore();
    return storage.run(
      {
        trx,
        // Fill with existing callbacks if nesting transactions
        commitCallbacks: store?.commitCallbacks || [],
        rollbackCallbacks: store?.rollbackCallbacks || []
      },
      cb
    );
  },
  get() {
    const store = storage.getStore();
    return store?.trx;
  },
  async commit(trx) {
    const store = storage.getStore();
    if (store?.trx) {
      store.trx = null;
    }
    await trx.commit();
    if (!store?.commitCallbacks.length) {
      return;
    }
    store.commitCallbacks.forEach((cb) => cb());
    store.commitCallbacks = [];
  },
  async rollback(trx) {
    const store = storage.getStore();
    if (store?.trx) {
      store.trx = null;
    }
    await trx.rollback();
    if (!store?.rollbackCallbacks.length) {
      return;
    }
    store.rollbackCallbacks.forEach((cb) => cb());
    store.rollbackCallbacks = [];
  },
  onCommit(cb) {
    const store = storage.getStore();
    if (store?.commitCallbacks) {
      store.commitCallbacks.push(cb);
    }
  },
  onRollback(cb) {
    const store = storage.getStore();
    if (store?.rollbackCallbacks) {
      store.rollbackCallbacks.push(cb);
    }
  }
};
function isKnexQuery(value) {
  return value instanceof KnexBuilder || value instanceof KnexRaw;
}
const addSchema = (db, tableName) => {
  const schemaName = db.getSchemaName();
  return schemaName ? `${schemaName}.${tableName}` : tableName;
};
const fromSingleRow = (meta, row) => {
  const { attributes } = meta;
  if (_.isNil(row)) {
    return null;
  }
  const obj = {};
  for (const column in row) {
    if (!_.has(column, meta.columnToAttribute)) {
      continue;
    }
    const attributeName = meta.columnToAttribute[column];
    const attribute = attributes[attributeName];
    if (isScalar(attribute.type)) {
      const field = createField(attribute);
      const val = row[column] === null ? null : field.fromDB(row[column]);
      obj[attributeName] = val;
    }
    if (isRelation(attribute.type)) {
      obj[attributeName] = row[column];
    }
  }
  return obj;
};
const fromRow = (meta, row) => {
  if (_.isNil(row)) {
    return null;
  }
  if (Array.isArray(row)) {
    return row.map((singleRow) => fromSingleRow(meta, singleRow));
  }
  return fromSingleRow(meta, row);
};
const toSingleRow = (meta, data = {}) => {
  if (_.isNil(data)) {
    return data;
  }
  const { attributes } = meta;
  for (const key of Object.keys(data)) {
    const attribute = attributes[key];
    if (!attribute || !("columnName" in attribute) || !attribute.columnName || attribute.columnName === key) {
      continue;
    }
    data[attribute.columnName] = data[key];
    delete data[key];
  }
  return data;
};
function toRow(meta, data) {
  if (_.isNil(data)) {
    return data;
  }
  if (_.isArray(data)) {
    return data.map((datum) => toSingleRow(meta, datum));
  }
  return toSingleRow(meta, data);
}
const toColumnName = (meta, name) => {
  if (!name) {
    throw new Error("Name cannot be null");
  }
  const attribute = meta.attributes[name];
  if (!attribute) {
    return name;
  }
  return "columnName" in attribute && attribute.columnName || name;
};
const applySearch = (knex2, query, ctx) => {
  const { qb, uid, db } = ctx;
  const meta = db.metadata.get(uid);
  const { attributes } = meta;
  const searchColumns = ["id"];
  const stringColumns = Object.keys(attributes).filter((attributeName) => {
    const attribute = attributes[attributeName];
    return isScalarAttribute(attribute) && isString(attribute.type) && attribute.searchable !== false;
  });
  searchColumns.push(...stringColumns);
  if (!_.isNaN(_.toNumber(query))) {
    const numberColumns = Object.keys(attributes).filter((attributeName) => {
      const attribute = attributes[attributeName];
      return isScalarAttribute(attribute) && isNumber(attribute.type) && attribute.searchable !== false;
    });
    searchColumns.push(...numberColumns);
  }
  switch (db.dialect.client) {
    case "postgres": {
      searchColumns.forEach((attr) => {
        const columnName = toColumnName(meta, attr);
        return knex2.orWhereRaw(`??::text ILIKE ?`, [
          qb.aliasColumn(columnName),
          `%${escapeQuery(query, "*%\\")}%`
        ]);
      });
      break;
    }
    case "sqlite": {
      searchColumns.forEach((attr) => {
        const columnName = toColumnName(meta, attr);
        return knex2.orWhereRaw(`?? LIKE ? ESCAPE '\\'`, [
          qb.aliasColumn(columnName),
          `%${escapeQuery(query, "*%\\")}%`
        ]);
      });
      break;
    }
    case "mysql": {
      searchColumns.forEach((attr) => {
        const columnName = toColumnName(meta, attr);
        return knex2.orWhereRaw(`?? LIKE ?`, [
          qb.aliasColumn(columnName),
          `%${escapeQuery(query, "*%\\")}%`
        ]);
      });
      break;
    }
  }
};
const escapeQuery = (query, charsToEscape, escapeChar = "\\") => {
  return query.split("").reduce(
    (escapedQuery, char) => charsToEscape.includes(char) ? `${escapedQuery}${escapeChar}${char}` : `${escapedQuery}${char}`,
    ""
  );
};
const createPivotJoin = (ctx, { alias: alias2, refAlias, joinTable, targetMeta }) => {
  const { qb } = ctx;
  const joinAlias = qb.getAlias();
  qb.join({
    alias: joinAlias,
    referencedTable: joinTable.name,
    referencedColumn: joinTable.joinColumn.name,
    rootColumn: joinTable.joinColumn.referencedColumn,
    rootTable: alias2,
    on: joinTable.on
  });
  const subAlias = refAlias || qb.getAlias();
  qb.join({
    alias: subAlias,
    referencedTable: targetMeta.tableName,
    referencedColumn: joinTable.inverseJoinColumn.referencedColumn,
    rootColumn: joinTable.inverseJoinColumn.name,
    rootTable: joinAlias
  });
  return subAlias;
};
const createJoin = (ctx, { alias: alias2, refAlias, attributeName, attribute }) => {
  const { db, qb, uid } = ctx;
  if (attribute.type !== "relation") {
    throw new Error(`Cannot join on non relational field ${attributeName}`);
  }
  const targetMeta = db.metadata.get(attribute.target);
  if (["morphOne", "morphMany"].includes(attribute.relation)) {
    const targetAttribute = targetMeta.attributes[attribute.morphBy];
    const { joinTable: joinTable2, morphColumn } = targetAttribute;
    if (morphColumn) {
      const subAlias = refAlias || qb.getAlias();
      qb.join({
        alias: subAlias,
        referencedTable: targetMeta.tableName,
        referencedColumn: morphColumn.idColumn.name,
        rootColumn: morphColumn.idColumn.referencedColumn,
        rootTable: alias2,
        on: {
          [morphColumn.typeColumn.name]: uid,
          ...morphColumn.on
        }
      });
      return subAlias;
    }
    if (joinTable2) {
      const joinAlias = qb.getAlias();
      qb.join({
        alias: joinAlias,
        referencedTable: joinTable2.name,
        referencedColumn: joinTable2.morphColumn.idColumn.name,
        rootColumn: joinTable2.morphColumn.idColumn.referencedColumn,
        rootTable: alias2,
        on: {
          [joinTable2.morphColumn.typeColumn.name]: uid,
          field: attributeName
        }
      });
      const subAlias = refAlias || qb.getAlias();
      qb.join({
        alias: subAlias,
        referencedTable: targetMeta.tableName,
        referencedColumn: joinTable2.joinColumn.referencedColumn,
        rootColumn: joinTable2.joinColumn.name,
        rootTable: joinAlias
      });
      return subAlias;
    }
    return alias2;
  }
  const { joinColumn } = attribute;
  if (joinColumn) {
    const subAlias = refAlias || qb.getAlias();
    qb.join({
      alias: subAlias,
      referencedTable: targetMeta.tableName,
      referencedColumn: joinColumn.referencedColumn,
      rootColumn: joinColumn.name,
      rootTable: alias2
    });
    return subAlias;
  }
  const { joinTable } = attribute;
  if (joinTable) {
    return createPivotJoin(ctx, { alias: alias2, refAlias, joinTable, targetMeta });
  }
  return alias2;
};
const applyJoin = (qb, join) => {
  const {
    method = "leftJoin",
    alias: alias2,
    referencedTable,
    referencedColumn,
    rootColumn,
    // FIXME: qb.alias can't exist here
    rootTable,
    // = qb.alias
    on,
    orderBy
  } = join;
  qb[method](`${referencedTable} as ${alias2}`, (inner) => {
    inner.on(`${rootTable}.${rootColumn}`, `${alias2}.${referencedColumn}`);
    if (on) {
      for (const key of Object.keys(on)) {
        inner.onVal(`${alias2}.${key}`, on[key]);
      }
    }
  });
  if (orderBy) {
    Object.keys(orderBy).forEach((column) => {
      const direction = orderBy[column];
      qb.orderBy(`${alias2}.${column}`, direction);
    });
  }
};
const applyJoins = (qb, joins) => {
  return joins.forEach((join) => applyJoin(qb, join));
};
const COL_STRAPI_ROW_NUMBER = "__strapi_row_number";
const COL_STRAPI_ORDER_BY_PREFIX = "__strapi_order_by";
const processOrderBy = (orderBy, ctx) => {
  const { db, uid, qb, alias: alias2 } = ctx;
  const meta = db.metadata.get(uid);
  const { attributes } = meta;
  if (typeof orderBy === "string") {
    const attribute = attributes[orderBy];
    if (!attribute) {
      throw new Error(`Attribute ${orderBy} not found on model ${uid}`);
    }
    const columnName = toColumnName(meta, orderBy);
    return [{ column: qb.aliasColumn(columnName, alias2) }];
  }
  if (Array.isArray(orderBy)) {
    return orderBy.flatMap((value) => processOrderBy(value, ctx));
  }
  if (_.isPlainObject(orderBy)) {
    return Object.entries(orderBy).flatMap(([key, direction]) => {
      const value = orderBy[key];
      const attribute = attributes[key];
      if (!attribute) {
        throw new Error(`Attribute ${key} not found on model ${uid}`);
      }
      if (isScalar(attribute.type)) {
        const columnName = toColumnName(meta, key);
        return { column: qb.aliasColumn(columnName, alias2), order: direction };
      }
      if (attribute.type === "relation" && "target" in attribute) {
        const subAlias = createJoin(ctx, {
          alias: alias2 || qb.alias,
          attributeName: key,
          attribute
        });
        return processOrderBy(value, {
          db,
          qb,
          alias: subAlias,
          uid: attribute.target
        });
      }
      throw new Error(`You cannot order on ${attribute.type} types`);
    });
  }
  throw new Error("Invalid orderBy syntax");
};
const getStrapiOrderColumnAlias = (column) => {
  const trimmedColumnName = column.replaceAll(".", "_");
  return `${COL_STRAPI_ORDER_BY_PREFIX}__${trimmedColumnName}`;
};
const wrapWithDeepSort = (originalQuery, ctx) => {
  const { db, qb, uid } = ctx;
  const { tableName } = db.metadata.get(uid);
  const orderBy = _.cloneDeep(qb.state.orderBy);
  const resultQueryAlias = qb.getAlias();
  const aliasedTableName = qb.mustUseAlias() ? alias(resultQueryAlias, tableName) : tableName;
  const resultQuery = db.getConnection(aliasedTableName);
  const baseQuery = originalQuery.clone();
  const baseQueryAlias = qb.getAlias();
  baseQuery.clear("select").clear("order").clear("limit").clear("offset");
  baseQuery.select(
    // Always select the row id for future manipulation
    prefix(qb.alias, "id"),
    ...orderBy.map(
      (orderByClause) => alias(getStrapiOrderColumnAlias(orderByClause.column), orderByClause.column)
    )
  );
  const partitionedQueryAlias = qb.getAlias();
  const selectRowsAsNumberedPartitions = (partitionedQuery) => {
    const prefixedOrderBy = orderBy.map((orderByClause) => ({
      column: prefix(baseQueryAlias, getStrapiOrderColumnAlias(orderByClause.column)),
      order: orderByClause.order
    }));
    const orderByColumns = prefixedOrderBy.map(_.prop("column"));
    partitionedQuery.select(
      // Always select baseQuery.id
      prefix(baseQueryAlias, "id"),
      ...orderByColumns
    ).rowNumber(COL_STRAPI_ROW_NUMBER, (subQuery) => {
      for (const orderByClause of prefixedOrderBy) {
        subQuery.orderBy(orderByClause.column, orderByClause.order, "last");
      }
      subQuery.partitionBy(`${baseQueryAlias}.id`);
    }).from(baseQuery.as(baseQueryAlias)).as(partitionedQueryAlias);
  };
  const originalSelect = _.difference(
    qb.state.select,
    // Remove order by columns from the initial select
    qb.state.orderBy.map(_.prop("column"))
  ).map(prefix(resultQueryAlias));
  resultQuery.select(originalSelect).innerJoin(selectRowsAsNumberedPartitions, function() {
    this.on(`${partitionedQueryAlias}.id`, `${resultQueryAlias}.id`).andOnVal(`${partitionedQueryAlias}.${COL_STRAPI_ROW_NUMBER}`, "=", 1);
  });
  if (qb.state.limit) {
    resultQuery.limit(qb.state.limit);
  }
  if (qb.state.offset) {
    resultQuery.offset(qb.state.offset);
  }
  if (qb.state.first) {
    resultQuery.first();
  }
  resultQuery.orderBy([
    // Transform "order by" clause to their T alias and prefix them with T alias
    ...orderBy.map((orderByClause) => ({
      column: prefix(partitionedQueryAlias, getStrapiOrderColumnAlias(orderByClause.column)),
      order: orderByClause.order
    })),
    // Add T.id to the order by clause to get consistent results in case several rows have the exact same order
    { column: `${partitionedQueryAlias}.id`, order: "asc" }
  ]);
  return resultQuery;
};
const alias = _.curry((alias2, value) => `${value} as ${alias2}`);
const prefix = _.curry((prefix2, value) => `${prefix2}.${value}`);
const joinColPrefix = "__strapi";
const XtoOne = async (input, ctx) => {
  const { attribute, attributeName, results, populateValue, targetMeta, isCount } = input;
  const { db, qb } = ctx;
  const fromTargetRow = (rowOrRows) => fromRow(targetMeta, rowOrRows);
  if ("joinColumn" in attribute && attribute.joinColumn) {
    const { name: joinColumnName, referencedColumn: referencedColumnName } = attribute.joinColumn;
    const referencedValues = _.uniq(
      results.map((r) => r[joinColumnName]).filter((value) => !_.isNil(value))
    );
    if (_.isEmpty(referencedValues)) {
      results.forEach((result) => {
        result[attributeName] = null;
      });
      return;
    }
    const rows = await db.entityManager.createQueryBuilder(targetMeta.uid).init(populateValue).addSelect(`${qb.alias}.${referencedColumnName}`).where({ [referencedColumnName]: referencedValues }).execute({ mapResults: false });
    const map2 = _.groupBy(referencedColumnName)(rows);
    results.forEach((result) => {
      result[attributeName] = fromTargetRow(_.first(map2[result[joinColumnName]]));
    });
    return;
  }
  if ("joinTable" in attribute && attribute.joinTable) {
    const { joinTable } = attribute;
    const qb2 = db.entityManager.createQueryBuilder(targetMeta.uid);
    const { name: joinColumnName, referencedColumn: referencedColumnName } = joinTable.joinColumn;
    const alias2 = qb2.getAlias();
    const joinColAlias = `${alias2}.${joinColumnName}`;
    const joinColRenameAs = `${joinColPrefix}${joinColumnName}`;
    const joinColSelect = `${joinColAlias} as ${joinColRenameAs}`;
    const referencedValues = _.uniq(
      results.map((r) => r[referencedColumnName]).filter((value) => !_.isNil(value))
    );
    if (isCount) {
      if (_.isEmpty(referencedValues)) {
        results.forEach((result) => {
          result[attributeName] = { count: 0 };
        });
        return;
      }
      const rows2 = await qb2.init(populateValue).join({
        alias: alias2,
        referencedTable: joinTable.name,
        referencedColumn: joinTable.inverseJoinColumn.name,
        rootColumn: joinTable.inverseJoinColumn.referencedColumn,
        rootTable: qb2.alias,
        on: joinTable.on
      }).select([joinColAlias, qb2.raw("count(*) AS count")]).where({ [joinColAlias]: referencedValues }).groupBy(joinColAlias).execute({ mapResults: false });
      const map22 = rows2.reduce(
        (map3, row) => {
          map3[row[joinColumnName]] = { count: Number(row.count) };
          return map3;
        },
        {}
      );
      results.forEach((result) => {
        result[attributeName] = map22[result[referencedColumnName]] || { count: 0 };
      });
      return;
    }
    if (_.isEmpty(referencedValues)) {
      results.forEach((result) => {
        result[attributeName] = null;
      });
      return;
    }
    const rows = await qb2.init(populateValue).join({
      alias: alias2,
      referencedTable: joinTable.name,
      referencedColumn: joinTable.inverseJoinColumn.name,
      rootColumn: joinTable.inverseJoinColumn.referencedColumn,
      rootTable: qb2.alias,
      on: joinTable.on,
      orderBy: joinTable.orderBy
    }).addSelect(joinColSelect).where({ [joinColAlias]: referencedValues }).execute({ mapResults: false });
    const map2 = _.groupBy(joinColRenameAs)(rows);
    results.forEach((result) => {
      result[attributeName] = fromTargetRow(_.first(map2[result[referencedColumnName]]));
    });
  }
};
const oneToMany = async (input, ctx) => {
  const { attribute, attributeName, results, populateValue, targetMeta, isCount } = input;
  const { db, qb } = ctx;
  const fromTargetRow = (rowOrRows) => fromRow(targetMeta, rowOrRows);
  if ("joinColumn" in attribute && attribute.joinColumn) {
    const {
      name: joinColumnName,
      referencedColumn: referencedColumnName,
      on
    } = attribute.joinColumn;
    const referencedValues = _.uniq(
      results.map((r) => r[joinColumnName]).filter((value) => !_.isNil(value))
    );
    if (_.isEmpty(referencedValues)) {
      results.forEach((result) => {
        result[attributeName] = null;
      });
      return;
    }
    const rows = await db.entityManager.createQueryBuilder(targetMeta.uid).init(populateValue).addSelect(`${qb.alias}.${referencedColumnName}`).where({
      [referencedColumnName]: referencedValues,
      ...on && typeof on === "function" ? on({ populateValue, results }) : {}
    }).execute({ mapResults: false });
    const map2 = _.groupBy(referencedColumnName)(rows);
    results.forEach((result) => {
      result[attributeName] = fromTargetRow(map2[result[joinColumnName]] || []);
    });
    return;
  }
  if ("joinTable" in attribute && attribute.joinTable) {
    const { joinTable } = attribute;
    const qb2 = db.entityManager.createQueryBuilder(targetMeta.uid);
    const { name: joinColumnName, referencedColumn: referencedColumnName } = joinTable.joinColumn;
    const alias2 = qb2.getAlias();
    const joinColAlias = `${alias2}.${joinColumnName}`;
    const joinColRenameAs = `${joinColPrefix}${joinColumnName}`;
    const joinColSelect = `${joinColAlias} as ${joinColRenameAs}`;
    const referencedValues = _.uniq(
      results.map((r) => r[referencedColumnName]).filter((value) => !_.isNil(value))
    );
    if (isCount) {
      if (_.isEmpty(referencedValues)) {
        results.forEach((result) => {
          result[attributeName] = { count: 0 };
        });
        return;
      }
      const rows2 = await qb2.init(populateValue).join({
        alias: alias2,
        referencedTable: joinTable.name,
        referencedColumn: joinTable.inverseJoinColumn.name,
        rootColumn: joinTable.inverseJoinColumn.referencedColumn,
        rootTable: qb2.alias,
        on: joinTable.on
      }).select([joinColSelect, qb2.raw("count(*) AS count")]).where({ [joinColAlias]: referencedValues }).groupBy(joinColAlias).execute({ mapResults: false });
      const map22 = rows2.reduce(
        (map3, row) => {
          map3[row[joinColRenameAs]] = { count: Number(row.count) };
          return map3;
        },
        {}
      );
      results.forEach((result) => {
        result[attributeName] = map22[result[referencedColumnName]] || { count: 0 };
      });
      return;
    }
    if (_.isEmpty(referencedValues)) {
      results.forEach((result) => {
        result[attributeName] = [];
      });
      return;
    }
    const rows = await qb2.init(populateValue).join({
      alias: alias2,
      referencedTable: joinTable.name,
      referencedColumn: joinTable.inverseJoinColumn.name,
      rootColumn: joinTable.inverseJoinColumn.referencedColumn,
      rootTable: qb2.alias,
      on: joinTable.on,
      orderBy: _.mapValues((v) => populateValue.ordering || v, joinTable.orderBy)
    }).addSelect(joinColSelect).where({ [joinColAlias]: referencedValues }).execute({ mapResults: false });
    const map2 = _.groupBy(joinColRenameAs)(rows);
    results.forEach((r) => {
      r[attributeName] = fromTargetRow(map2[r[referencedColumnName]] || []);
    });
  }
};
const manyToMany = async (input, ctx) => {
  const { attribute, attributeName, results, populateValue, targetMeta, isCount } = input;
  const { db } = ctx;
  const fromTargetRow = (rowOrRows) => fromRow(targetMeta, rowOrRows);
  const { joinTable } = attribute;
  const populateQb = db.entityManager.createQueryBuilder(targetMeta.uid);
  const { name: joinColumnName, referencedColumn: referencedColumnName } = joinTable.joinColumn;
  const alias2 = populateQb.getAlias();
  const joinColAlias = `${alias2}.${joinColumnName}`;
  const joinColRenameAs = `${joinColPrefix}${joinColumnName}`;
  const joinColSelect = `${joinColAlias} as ${joinColRenameAs}`;
  const referencedValues = _.uniq(
    results.map((r) => r[referencedColumnName]).filter((value) => !_.isNil(value))
  );
  if (isCount) {
    if (_.isEmpty(referencedValues)) {
      results.forEach((result) => {
        result[attributeName] = { count: 0 };
      });
      return;
    }
    const rows2 = await populateQb.init(populateValue).join({
      alias: alias2,
      referencedTable: joinTable.name,
      referencedColumn: joinTable.inverseJoinColumn.name,
      rootColumn: joinTable.inverseJoinColumn.referencedColumn,
      rootTable: populateQb.alias,
      on: joinTable.on
    }).select([joinColAlias, populateQb.raw("count(*) AS count")]).where({ [joinColAlias]: referencedValues }).groupBy(joinColAlias).execute({ mapResults: false });
    const map22 = rows2.reduce(
      (map3, row) => {
        map3[row[joinColumnName]] = { count: Number(row.count) };
        return map3;
      },
      {}
    );
    results.forEach((result) => {
      result[attributeName] = map22[result[referencedColumnName]] || { count: 0 };
    });
    return;
  }
  if (_.isEmpty(referencedValues)) {
    results.forEach((result) => {
      result[attributeName] = [];
    });
    return;
  }
  const rows = await populateQb.init(populateValue).join({
    alias: alias2,
    referencedTable: joinTable.name,
    referencedColumn: joinTable.inverseJoinColumn.name,
    rootColumn: joinTable.inverseJoinColumn.referencedColumn,
    rootTable: populateQb.alias,
    on: joinTable.on,
    orderBy: _.mapValues((v) => populateValue.ordering || v, joinTable.orderBy)
  }).addSelect(joinColSelect).where({ [joinColAlias]: referencedValues }).execute({ mapResults: false });
  const map2 = _.groupBy(joinColRenameAs)(rows);
  results.forEach((result) => {
    result[attributeName] = fromTargetRow(map2[result[referencedColumnName]] || []);
  });
};
const morphX = async (input, ctx) => {
  const { attribute, attributeName, results, populateValue, targetMeta } = input;
  const { db, uid } = ctx;
  const fromTargetRow = (rowOrRows) => fromRow(targetMeta, rowOrRows);
  const { target, morphBy } = attribute;
  const targetAttribute = db.metadata.get(target).attributes[morphBy];
  if (targetAttribute.type === "relation" && targetAttribute.relation === "morphToOne") {
    const { idColumn, typeColumn } = targetAttribute.morphColumn;
    const referencedValues = _.uniq(
      results.map((r) => r[idColumn.referencedColumn]).filter((value) => !_.isNil(value))
    );
    if (_.isEmpty(referencedValues)) {
      results.forEach((result) => {
        result[attributeName] = null;
      });
      return;
    }
    const rows = await db.entityManager.createQueryBuilder(target).init(populateValue).where({ [idColumn.name]: referencedValues, [typeColumn.name]: uid }).execute({ mapResults: false });
    const map2 = _.groupBy(idColumn.name)(rows);
    results.forEach((result) => {
      const matchingRows = map2[result[idColumn.referencedColumn]];
      const matchingValue = attribute.relation === "morphOne" ? _.first(matchingRows) : matchingRows;
      result[attributeName] = fromTargetRow(matchingValue);
    });
  } else if (targetAttribute.type === "relation" && targetAttribute.relation === "morphToMany") {
    const { joinTable } = targetAttribute;
    const { joinColumn, morphColumn } = joinTable;
    const { idColumn, typeColumn } = morphColumn;
    const referencedValues = _.uniq(
      results.map((r) => r[idColumn.referencedColumn]).filter((value) => !_.isNil(value))
    );
    if (_.isEmpty(referencedValues)) {
      results.forEach((result) => {
        result[attributeName] = attribute.relation === "morphOne" ? null : [];
      });
      return;
    }
    const qb = db.entityManager.createQueryBuilder(target);
    const alias2 = qb.getAlias();
    const rows = await qb.init(populateValue).join({
      alias: alias2,
      referencedTable: joinTable.name,
      referencedColumn: joinColumn.name,
      rootColumn: joinColumn.referencedColumn,
      rootTable: qb.alias,
      on: {
        ...joinTable.on || {},
        field: attributeName
      },
      orderBy: _.mapValues((v) => populateValue.ordering || v, joinTable.orderBy)
    }).addSelect([`${alias2}.${idColumn.name}`, `${alias2}.${typeColumn.name}`]).where({
      [`${alias2}.${idColumn.name}`]: referencedValues,
      [`${alias2}.${typeColumn.name}`]: uid
    }).execute({ mapResults: false });
    const map2 = _.groupBy(idColumn.name)(rows);
    results.forEach((result) => {
      const matchingRows = map2[result[idColumn.referencedColumn]];
      const matchingValue = attribute.relation === "morphOne" ? _.first(matchingRows) : matchingRows;
      result[attributeName] = fromTargetRow(matchingValue);
    });
  }
};
const morphToMany = async (input, ctx) => {
  const { attribute, attributeName, results, populateValue } = input;
  const { db } = ctx;
  const { joinTable } = attribute;
  const { joinColumn, morphColumn } = joinTable;
  const { idColumn, typeColumn, typeField = "__type" } = morphColumn;
  const referencedValues = _.uniq(
    results.map((r) => r[joinColumn.referencedColumn]).filter((value) => !_.isNil(value))
  );
  const qb = db.entityManager.createQueryBuilder(joinTable.name);
  const joinRows = await qb.where({
    [joinColumn.name]: referencedValues,
    ...joinTable.on || {},
    // If the populateValue contains an "on" property,
    // only populate the types defined in it
    ..."on" in populateValue ? { [morphColumn.typeColumn.name]: Object.keys(populateValue.on ?? {}) } : {}
  }).orderBy([joinColumn.name, "order"]).execute({ mapResults: false });
  const joinMap = _.groupBy(joinColumn.name, joinRows);
  const idsByType = joinRows.reduce((acc, result) => {
    const idValue = result[morphColumn.idColumn.name];
    const typeValue = result[morphColumn.typeColumn.name];
    if (!idValue || !typeValue) {
      return acc;
    }
    if (!_.has(typeValue, acc)) {
      acc[typeValue] = [];
    }
    acc[typeValue].push(idValue);
    return acc;
  }, {});
  const map2 = {};
  const { on, ...typePopulate } = populateValue;
  for (const type of Object.keys(idsByType)) {
    const ids = idsByType[type];
    if (!db.metadata.get(type)) {
      map2[type] = {};
      continue;
    }
    const qb2 = db.entityManager.createQueryBuilder(type);
    const rows = await qb2.init(on?.[type] ?? typePopulate).addSelect(`${qb2.alias}.${idColumn.referencedColumn}`).where({ [idColumn.referencedColumn]: ids }).execute({ mapResults: false });
    map2[type] = _.groupBy(idColumn.referencedColumn)(rows);
  }
  results.forEach((result) => {
    const joinResults = joinMap[result[joinColumn.referencedColumn]] || [];
    const matchingRows = joinResults.flatMap((joinResult) => {
      const id = joinResult[idColumn.name];
      const type = joinResult[typeColumn.name];
      const targetMeta = db.metadata.get(type);
      const fromTargetRow = (rowOrRows) => fromRow(targetMeta, rowOrRows);
      return (map2[type][id] || []).map((row) => {
        return {
          [typeField]: type,
          ...fromTargetRow(row)
        };
      });
    });
    result[attributeName] = matchingRows;
  });
};
const morphToOne = async (input, ctx) => {
  const { attribute, attributeName, results, populateValue } = input;
  const { db } = ctx;
  const { morphColumn } = attribute;
  const { idColumn, typeColumn } = morphColumn;
  const idsByType = results.reduce((acc, result) => {
    const idValue = result[morphColumn.idColumn.name];
    const typeValue = result[morphColumn.typeColumn.name];
    if (!idValue || !typeValue) {
      return acc;
    }
    if (!(typeValue in acc)) {
      acc[typeValue] = [];
    }
    acc[typeValue].push(idValue);
    return acc;
  }, {});
  const map2 = {};
  const { on, ...typePopulate } = populateValue;
  for (const type of Object.keys(idsByType)) {
    const ids = idsByType[type];
    if (!db.metadata.get(type)) {
      map2[type] = {};
      return;
    }
    const qb = db.entityManager.createQueryBuilder(type);
    const rows = await qb.init(on?.[type] ?? typePopulate).addSelect(`${qb.alias}.${idColumn.referencedColumn}`).where({ [idColumn.referencedColumn]: ids }).execute({ mapResults: false });
    map2[type] = _.groupBy(idColumn.referencedColumn)(rows);
  }
  results.forEach((result) => {
    const id = result[idColumn.name];
    const type = result[typeColumn.name];
    if (!type || !id) {
      result[attributeName] = null;
      return;
    }
    const matchingRows = map2[type][id];
    const fromTargetRow = (rowOrRows) => fromRow(db.metadata.get(type), rowOrRows);
    result[attributeName] = fromTargetRow(_.first(matchingRows));
  });
};
const pickPopulateParams = (populate) => {
  const fieldsToPick = [
    "select",
    "count",
    "where",
    "populate",
    "orderBy",
    "filters",
    "ordering",
    "on"
  ];
  if (populate.count !== true) {
    fieldsToPick.push("limit", "offset");
  }
  return _.pick(fieldsToPick, populate);
};
const applyPopulate = async (results, populate, ctx) => {
  const { db, uid, qb } = ctx;
  const meta = db.metadata.get(uid);
  if (_.isEmpty(results)) {
    return results;
  }
  for (const attributeName of Object.keys(populate)) {
    const attribute = meta.attributes[attributeName];
    if (attribute.type !== "relation") {
      throw new Error(`Invalid populate attribute ${attributeName}`);
    }
    const populateValue = {
      filters: qb.state.filters,
      ...pickPopulateParams(populate[attributeName])
    };
    const isCount = "count" in populateValue && populateValue.count === true;
    switch (attribute.relation) {
      case "oneToOne":
      case "manyToOne": {
        const targetMeta = db.metadata.get(attribute.target);
        const input = { attribute, attributeName, results, populateValue, targetMeta, isCount };
        await XtoOne(input, ctx);
        break;
      }
      case "oneToMany": {
        const targetMeta = db.metadata.get(attribute.target);
        const input = { attribute, attributeName, results, populateValue, targetMeta, isCount };
        await oneToMany(input, ctx);
        break;
      }
      case "manyToMany": {
        const targetMeta = db.metadata.get(attribute.target);
        const input = { attribute, attributeName, results, populateValue, targetMeta, isCount };
        await manyToMany(input, ctx);
        break;
      }
      case "morphOne":
      case "morphMany": {
        const targetMeta = db.metadata.get(attribute.target);
        const input = { attribute, attributeName, results, populateValue, targetMeta, isCount };
        await morphX(input, ctx);
        break;
      }
      case "morphToMany": {
        const input = { attribute, attributeName, results, populateValue, isCount };
        await morphToMany(input, ctx);
        break;
      }
      case "morphToOne": {
        const input = { attribute, attributeName, results, populateValue, isCount };
        await morphToOne(input, ctx);
        break;
      }
    }
  }
};
const getRootLevelPopulate = (meta) => {
  const populate = {};
  for (const attributeName of Object.keys(meta.attributes)) {
    const attribute = meta.attributes[attributeName];
    if (attribute.type === "relation") {
      populate[attributeName] = true;
    }
  }
  return populate;
};
const processPopulate = (populate, ctx) => {
  const { qb, db, uid } = ctx;
  const meta = db.metadata.get(uid);
  let populateMap = {};
  if (populate === false || _.isNil(populate)) {
    return null;
  }
  if (populate === true) {
    populateMap = getRootLevelPopulate(meta);
  } else if (Array.isArray(populate)) {
    for (const key of populate) {
      const [root, ...rest] = key.split(".");
      if (rest.length > 0) {
        const subPopulate = rest.join(".");
        if (populateMap[root]) {
          const populateValue = populateMap[root];
          if (populateValue === true) {
            populateMap[root] = {
              populate: [subPopulate]
            };
          } else {
            populateValue.populate = [subPopulate].concat(populateValue.populate ?? []);
          }
        } else {
          populateMap[root] = {
            populate: [subPopulate]
          };
        }
      } else {
        populateMap[root] = populateMap[root] ? populateMap[root] : true;
      }
    }
  } else {
    populateMap = populate;
  }
  if (!_.isPlainObject(populateMap)) {
    throw new Error("Populate must be an object");
  }
  const finalPopulate = {};
  for (const key of Object.keys(populateMap)) {
    const attribute = meta.attributes[key];
    if (!attribute) {
      continue;
    }
    if (!isRelation(attribute.type)) {
      continue;
    }
    if ("joinColumn" in attribute && attribute.joinColumn) {
      qb.addSelect(attribute.joinColumn.name);
    }
    if (_.has("id", meta.attributes)) {
      qb.addSelect("id");
    }
    finalPopulate[key] = populateMap[key];
  }
  return finalPopulate;
};
const isRecord$1 = (value) => isPlainObject(value);
const castValue = (value, attribute) => {
  if (!attribute) {
    return value;
  }
  if (isScalar(attribute.type) && !isKnexQuery(value)) {
    const field = createField(attribute);
    return value === null ? null : field.toDB(value);
  }
  return value;
};
const processSingleAttributeWhere = (attribute, where, operator = "$eq") => {
  if (!isRecord$1(where)) {
    if (isOperatorOfType("cast", operator)) {
      return castValue(where, attribute);
    }
    return where;
  }
  const filters = {};
  for (const key of Object.keys(where)) {
    const value = where[key];
    if (!isOperatorOfType("where", key)) {
      throw new Error(`Undefined attribute level operator ${key}`);
    }
    filters[key] = processAttributeWhere(attribute, value, key);
  }
  return filters;
};
const processAttributeWhere = (attribute, where, operator = "$eq") => {
  if (isArray(where)) {
    return where.map((sub) => processSingleAttributeWhere(attribute, sub, operator));
  }
  return processSingleAttributeWhere(attribute, where, operator);
};
const processNested = (where, ctx) => {
  if (!isRecord$1(where)) {
    return where;
  }
  return processWhere(where, ctx);
};
const processRelationWhere = (where, ctx) => {
  const { qb, alias: alias2 } = ctx;
  const idAlias = qb.aliasColumn("id", alias2);
  if (!isRecord$1(where)) {
    return { [idAlias]: where };
  }
  const keys = Object.keys(where);
  const operatorKeys = keys.filter((key) => isOperator(key));
  if (operatorKeys.length > 0 && operatorKeys.length !== keys.length) {
    throw new Error(`Operator and non-operator keys cannot be mixed in a relation where clause`);
  }
  if (operatorKeys.length > 1) {
    throw new Error(
      `Only one operator key is allowed in a relation where clause, but found: ${operatorKeys}`
    );
  }
  if (operatorKeys.length === 1) {
    const operator = operatorKeys[0];
    if (isOperatorOfType("group", operator)) {
      return processWhere(where, ctx);
    }
    return { [idAlias]: { [operator]: processNested(where[operator], ctx) } };
  }
  return processWhere(where, ctx);
};
function processWhere(where, ctx) {
  if (!isArray(where) && !isRecord$1(where)) {
    throw new Error("Where must be an array or an object");
  }
  if (isArray(where)) {
    return where.map((sub) => processWhere(sub, ctx));
  }
  const { db, uid, qb, alias: alias2 } = ctx;
  const meta = db.metadata.get(uid);
  const filters = {};
  for (const key of Object.keys(where)) {
    const value = where[key];
    if (isOperatorOfType("group", key)) {
      if (!Array.isArray(value)) {
        throw new Error(`Operator ${key} must be an array`);
      }
      filters[key] = value.map((sub) => processNested(sub, ctx));
      continue;
    }
    if (key === "$not") {
      filters[key] = processNested(value, ctx);
      continue;
    }
    if (isOperatorOfType("where", key)) {
      throw new Error(
        `Only $and, $or and $not can only be used as root level operators. Found ${key}.`
      );
    }
    const attribute = meta.attributes[key];
    if (!attribute) {
      filters[qb.aliasColumn(key, alias2)] = processAttributeWhere(null, value);
      continue;
    }
    if (isRelation(attribute.type) && "target" in attribute) {
      const subAlias = createJoin(ctx, {
        alias: alias2 || qb.alias,
        attributeName: key,
        attribute
      });
      const nestedWhere = processRelationWhere(value, {
        db,
        qb,
        alias: subAlias,
        uid: attribute.target
      });
      Object.assign(filters, nestedWhere);
      continue;
    }
    if (isScalar(attribute.type)) {
      const columnName = toColumnName(meta, key);
      const aliasedColumnName = qb.aliasColumn(columnName, alias2);
      filters[aliasedColumnName] = processAttributeWhere(attribute, value);
      continue;
    }
    throw new Error(`You cannot filter on ${attribute.type} types`);
  }
  return filters;
}
const applyOperator = (qb, column, operator, value) => {
  if (Array.isArray(value) && !isOperatorOfType("array", operator)) {
    return qb.where((subQB) => {
      value.forEach(
        (subValue) => subQB.orWhere((innerQB) => {
          applyOperator(innerQB, column, operator, subValue);
        })
      );
    });
  }
  switch (operator) {
    case "$not": {
      qb.whereNot((qb2) => applyWhereToColumn(qb2, column, value));
      break;
    }
    case "$in": {
      qb.whereIn(column, isKnexQuery(value) ? value : castArray(value));
      break;
    }
    case "$notIn": {
      qb.whereNotIn(column, isKnexQuery(value) ? value : castArray(value));
      break;
    }
    case "$eq": {
      if (value === null) {
        qb.whereNull(column);
        break;
      }
      qb.where(column, value);
      break;
    }
    case "$eqi": {
      if (value === null) {
        qb.whereNull(column);
        break;
      }
      qb.whereRaw(`${fieldLowerFn(qb)} LIKE LOWER(?)`, [column, `${value}`]);
      break;
    }
    case "$ne": {
      if (value === null) {
        qb.whereNotNull(column);
        break;
      }
      qb.where(column, "<>", value);
      break;
    }
    case "$nei": {
      if (value === null) {
        qb.whereNotNull(column);
        break;
      }
      qb.whereRaw(`${fieldLowerFn(qb)} NOT LIKE LOWER(?)`, [column, `${value}`]);
      break;
    }
    case "$gt": {
      qb.where(column, ">", value);
      break;
    }
    case "$gte": {
      qb.where(column, ">=", value);
      break;
    }
    case "$lt": {
      qb.where(column, "<", value);
      break;
    }
    case "$lte": {
      qb.where(column, "<=", value);
      break;
    }
    case "$null": {
      if (value) {
        qb.whereNull(column);
      } else {
        qb.whereNotNull(column);
      }
      break;
    }
    case "$notNull": {
      if (value) {
        qb.whereNotNull(column);
      } else {
        qb.whereNull(column);
      }
      break;
    }
    case "$between": {
      qb.whereBetween(column, value);
      break;
    }
    case "$startsWith": {
      qb.where(column, "like", `${value}%`);
      break;
    }
    case "$startsWithi": {
      qb.whereRaw(`${fieldLowerFn(qb)} LIKE LOWER(?)`, [column, `${value}%`]);
      break;
    }
    case "$endsWith": {
      qb.where(column, "like", `%${value}`);
      break;
    }
    case "$endsWithi": {
      qb.whereRaw(`${fieldLowerFn(qb)} LIKE LOWER(?)`, [column, `%${value}`]);
      break;
    }
    case "$contains": {
      qb.where(column, "like", `%${value}%`);
      break;
    }
    case "$notContains": {
      qb.whereNot(column, "like", `%${value}%`);
      break;
    }
    case "$containsi": {
      qb.whereRaw(`${fieldLowerFn(qb)} LIKE LOWER(?)`, [column, `%${value}%`]);
      break;
    }
    case "$notContainsi": {
      qb.whereRaw(`${fieldLowerFn(qb)} NOT LIKE LOWER(?)`, [column, `%${value}%`]);
      break;
    }
    case "$jsonSupersetOf": {
      qb.whereJsonSupersetOf(column, value);
      break;
    }
    default: {
      throw new Error(`Undefined attribute level operator ${operator}`);
    }
  }
};
const applyWhereToColumn = (qb, column, columnWhere) => {
  if (!isRecord$1(columnWhere)) {
    if (Array.isArray(columnWhere)) {
      return qb.whereIn(column, columnWhere);
    }
    return qb.where(column, columnWhere);
  }
  const keys = Object.keys(columnWhere);
  keys.forEach((operator) => {
    const value = columnWhere[operator];
    applyOperator(qb, column, operator, value);
  });
};
const applyWhere = (qb, where) => {
  if (!isArray(where) && !isRecord$1(where)) {
    throw new Error("Where must be an array or an object");
  }
  if (isArray(where)) {
    return qb.where(
      (subQB) => where.forEach((subWhere) => applyWhere(subQB, subWhere))
    );
  }
  Object.keys(where).forEach((key) => {
    if (key === "$and") {
      const value = where[key] ?? [];
      return qb.where((subQB) => {
        value.forEach((v) => applyWhere(subQB, v));
      });
    }
    if (key === "$or") {
      const value = where[key] ?? [];
      return qb.where((subQB) => {
        value.forEach((v) => subQB.orWhere((inner) => applyWhere(inner, v)));
      });
    }
    if (key === "$not") {
      const value = where[key] ?? {};
      return qb.whereNot((qb2) => applyWhere(qb2, value));
    }
    applyWhereToColumn(qb, key, where[key]);
  });
};
const fieldLowerFn = (qb) => {
  if (qb.client.dialect === "postgresql") {
    return "LOWER(CAST(?? AS VARCHAR))";
  }
  return "LOWER(??)";
};
const knexQueryDone = Symbol("knexQueryDone");
const knexPerformingQuery = Symbol("knexPerformingQuery");
class ReadableStrapiQuery extends Readable {
  _offset;
  _limit;
  _fetched;
  _query;
  _qb;
  _db;
  _uid;
  _meta;
  _batchSize;
  _mapResults;
  [knexPerformingQuery];
  constructor({ qb, db, uid, mapResults = true, batchSize = 500 }) {
    super({ objectMode: true, highWaterMark: batchSize });
    const { offset, limit } = qb.state;
    this._offset = isFinite(offset) ? Number(offset) : 0;
    this._limit = isFinite(limit) ? Number(limit) : null;
    this._fetched = 0;
    this._query = qb.getKnexQuery();
    this._qb = qb;
    this._db = db;
    this._uid = uid;
    this._meta = db.metadata.get(uid);
    this._batchSize = batchSize;
    this._mapResults = mapResults;
    this[knexPerformingQuery] = false;
  }
  _destroy(err, cb) {
    if (this[knexPerformingQuery]) {
      this.once(knexQueryDone, (er) => cb(err || er));
    } else {
      cb(err);
    }
  }
  /**
   * Custom ._read() implementation
   *
   *  NOTE: Here "size" means the number of entities to be read from the database.
   *  Not the actual byte size, as it would mean that we need to return partial entities.
   *
   */
  async _read(size) {
    const query = this._query;
    query.clear("limit").clear("offset");
    const maxReadSize = (
      // if no limit is defined in the query, use the given size,
      // otherwise, use the smallest value between the two
      this._limit === null ? size : Math.min(size, this._limit)
    );
    const limit = (
      // If a limit is defined
      this._limit !== null && // And reading `maxReadSize` would fetch too many entities (> _limit)
      this._fetched + maxReadSize > this._limit ? (
        // Then adjust the limit so that it only get the remaining entities
        this._limit - this._fetched
      ) : (
        // Else, use the max read size
        maxReadSize
      )
    );
    if (limit <= 0) {
      this.push(null);
      return;
    }
    const offset = this._offset + this._fetched;
    query.offset(offset).limit(limit);
    this[knexPerformingQuery] = true;
    let results;
    let count;
    let err;
    try {
      results = await query;
      const { populate } = this._qb.state;
      if (populate) {
        await applyPopulate(results, populate, { qb: this._qb, uid: this._uid, db: this._db });
      }
      if (this._mapResults) {
        results = fromRow(this._meta, results);
      }
      count = results.length;
    } catch (e) {
      err = e;
    }
    this[knexPerformingQuery] = false;
    if (this.destroyed) {
      this.emit(knexQueryDone);
      return;
    }
    if (err) {
      this.destroy(err);
      return;
    }
    this._fetched += count;
    for (const result of results) {
      this.push(result);
    }
    if (this._fetched === this._limit || count < this._batchSize) {
      this.push(null);
    }
  }
}
const createQueryBuilder = (uid, db, initialState = {}) => {
  const meta = db.metadata.get(uid);
  const { tableName } = meta;
  const state = _.defaults(
    {
      type: "select",
      select: [],
      count: null,
      max: null,
      first: false,
      data: null,
      where: [],
      joins: [],
      populate: null,
      limit: null,
      offset: null,
      transaction: null,
      forUpdate: false,
      onConflict: null,
      merge: null,
      ignore: false,
      orderBy: [],
      groupBy: [],
      increments: [],
      decrements: [],
      aliasCounter: 0,
      filters: null,
      search: null
    },
    initialState
  );
  const getAlias = () => {
    const alias2 = `t${state.aliasCounter}`;
    state.aliasCounter += 1;
    return alias2;
  };
  return {
    alias: getAlias(),
    getAlias,
    state,
    clone() {
      return createQueryBuilder(uid, db, state);
    },
    select(args) {
      state.type = "select";
      state.select = _.uniq(_.castArray(args));
      return this;
    },
    addSelect(args) {
      state.select = _.uniq([...state.select, ..._.castArray(args)]);
      return this;
    },
    insert(data) {
      state.type = "insert";
      state.data = data;
      return this;
    },
    onConflict(args) {
      state.onConflict = args;
      return this;
    },
    merge(args) {
      state.merge = args;
      return this;
    },
    ignore() {
      state.ignore = true;
      return this;
    },
    delete() {
      state.type = "delete";
      return this;
    },
    ref(name) {
      return db.connection.ref(toColumnName(meta, name));
    },
    update(data) {
      state.type = "update";
      state.data = data;
      return this;
    },
    increment(column, amount = 1) {
      state.type = "update";
      state.increments.push({ column, amount });
      return this;
    },
    decrement(column, amount = 1) {
      state.type = "update";
      state.decrements.push({ column, amount });
      return this;
    },
    count(count = "id") {
      state.type = "count";
      state.count = count;
      return this;
    },
    max(column) {
      state.type = "max";
      state.max = column;
      return this;
    },
    where(where = {}) {
      if (!_.isPlainObject(where)) {
        throw new Error("Where must be an object");
      }
      state.where.push(where);
      return this;
    },
    limit(limit) {
      state.limit = limit;
      return this;
    },
    offset(offset) {
      state.offset = offset;
      return this;
    },
    orderBy(orderBy) {
      state.orderBy = orderBy;
      return this;
    },
    groupBy(groupBy2) {
      state.groupBy = groupBy2;
      return this;
    },
    populate(populate) {
      state.populate = populate;
      return this;
    },
    search(query) {
      state.search = query;
      return this;
    },
    transacting(transaction) {
      state.transaction = transaction;
      return this;
    },
    forUpdate() {
      state.forUpdate = true;
      return this;
    },
    init(params = {}) {
      const { _q, filters, where, select, limit, offset, orderBy, groupBy: groupBy2, populate } = params;
      if (!_.isNil(where)) {
        this.where(where);
      }
      if (!_.isNil(_q)) {
        this.search(_q);
      }
      if (!_.isNil(select)) {
        this.select(select);
      } else {
        this.select("*");
      }
      if (!_.isNil(limit)) {
        this.limit(limit);
      }
      if (!_.isNil(offset)) {
        this.offset(offset);
      }
      if (!_.isNil(orderBy)) {
        this.orderBy(orderBy);
      }
      if (!_.isNil(groupBy2)) {
        this.groupBy(groupBy2);
      }
      if (!_.isNil(populate)) {
        this.populate(populate);
      }
      if (!_.isNil(filters)) {
        this.filters(filters);
      }
      return this;
    },
    filters(filters) {
      state.filters = filters;
    },
    first() {
      state.first = true;
      return this;
    },
    join(join) {
      if (!join.targetField) {
        state.joins.push(join);
        return this;
      }
      const model = db.metadata.get(uid);
      const attribute = model.attributes[join.targetField];
      createJoin(
        { db, qb: this, uid },
        {
          alias: this.alias,
          refAlias: join.alias,
          attributeName: join.targetField,
          attribute
        }
      );
      return this;
    },
    mustUseAlias() {
      return ["select", "count"].includes(state.type);
    },
    aliasColumn(key, alias2) {
      if (typeof key !== "string") {
        return key;
      }
      if (key.indexOf(".") >= 0) {
        return key;
      }
      if (!_.isNil(alias2)) {
        return `${alias2}.${key}`;
      }
      return this.mustUseAlias() ? `${this.alias}.${key}` : key;
    },
    raw: db.connection.raw.bind(db.connection),
    shouldUseSubQuery() {
      return ["delete", "update"].includes(state.type) && state.joins.length > 0;
    },
    runSubQuery() {
      this.select("id");
      const subQB = this.getKnexQuery();
      const nestedSubQuery = db.getConnection().select("id").from(subQB.as("subQuery"));
      const connection = db.getConnection(tableName);
      return connection[state.type]().whereIn("id", nestedSubQuery);
    },
    processState() {
      state.orderBy = processOrderBy(state.orderBy, { qb: this, uid, db });
      if (!_.isNil(state.filters)) {
        if (_.isFunction(state.filters)) {
          const filters = state.filters({ qb: this, uid, meta, db });
          if (!_.isNil(filters)) {
            state.where.push(filters);
          }
        } else {
          state.where.push(state.filters);
        }
      }
      state.where = processWhere(state.where, { qb: this, uid, db });
      state.populate = processPopulate(state.populate, { qb: this, uid, db });
      state.data = toRow(meta, state.data);
      this.processSelect();
    },
    shouldUseDistinct() {
      return state.joins.length > 0 && _.isEmpty(state.groupBy);
    },
    shouldUseDeepSort() {
      return state.orderBy.filter(({ column }) => column.indexOf(".") >= 0).filter(({ column }) => {
        const col = column.split(".");
        for (let i = 0; i < col.length - 1; i += 1) {
          const el = col[i];
          const isRelationAttribute = meta.attributes[el]?.type === "relation";
          const isAliasedRelation = Object.values(state.joins).map((join) => join.alias).includes(el);
          if (isRelationAttribute || isAliasedRelation) {
            return true;
          }
        }
        return false;
      }).length > 0;
    },
    processSelect() {
      state.select = state.select.map((field) => {
        if (isKnexQuery(field)) {
          return field;
        }
        return toColumnName(meta, field);
      });
      if (this.shouldUseDistinct()) {
        const joinsOrderByColumns = state.joins.flatMap((join) => {
          return _.keys(join.orderBy).map((key) => this.aliasColumn(key, join.alias));
        });
        const orderByColumns = state.orderBy.map(({ column }) => column);
        state.select = _.uniq([...joinsOrderByColumns, ...orderByColumns, ...state.select]);
      }
    },
    getKnexQuery() {
      if (!state.type) {
        this.select("*");
      }
      const aliasedTableName = this.mustUseAlias() ? `${tableName} as ${this.alias}` : tableName;
      const qb = db.getConnection(aliasedTableName);
      if (this.shouldUseSubQuery()) {
        return this.runSubQuery();
      }
      this.processState();
      switch (state.type) {
        case "select": {
          qb.select(state.select.map((column) => this.aliasColumn(column)));
          if (this.shouldUseDistinct()) {
            qb.distinct();
          }
          break;
        }
        case "count": {
          const dbColumnName = this.aliasColumn(toColumnName(meta, state.count));
          if (this.shouldUseDistinct()) {
            qb.countDistinct({ count: dbColumnName });
          } else {
            qb.count({ count: dbColumnName });
          }
          break;
        }
        case "max": {
          const dbColumnName = this.aliasColumn(toColumnName(meta, state.max));
          qb.max({ max: dbColumnName });
          break;
        }
        case "insert": {
          qb.insert(state.data);
          if (db.dialect.useReturning() && _.has("id", meta.attributes)) {
            qb.returning("id");
          }
          break;
        }
        case "update": {
          if (state.data) {
            qb.update(state.data);
          }
          break;
        }
        case "delete": {
          qb.delete();
          break;
        }
        case "truncate": {
          qb.truncate();
          break;
        }
        default: {
          throw new Error("Unknown query type");
        }
      }
      if (state.transaction) {
        qb.transacting(state.transaction);
      }
      if (state.forUpdate) {
        qb.forUpdate();
      }
      if (!_.isEmpty(state.increments)) {
        state.increments.forEach((incr) => qb.increment(incr.column, incr.amount));
      }
      if (!_.isEmpty(state.decrements)) {
        state.decrements.forEach((decr) => qb.decrement(decr.column, decr.amount));
      }
      if (state.onConflict) {
        if (state.merge) {
          qb.onConflict(state.onConflict).merge(state.merge);
        } else if (state.ignore) {
          qb.onConflict(state.onConflict).ignore();
        }
      }
      if (state.limit) {
        qb.limit(state.limit);
      }
      if (state.offset) {
        qb.offset(state.offset);
      }
      if (state.orderBy.length > 0) {
        qb.orderBy(state.orderBy);
      }
      if (state.first) {
        qb.first();
      }
      if (state.groupBy.length > 0) {
        qb.groupBy(state.groupBy);
      }
      if (state.where) {
        applyWhere(qb, state.where);
      }
      if (state.search) {
        qb.where((subQb) => {
          applySearch(subQb, state.search, { qb: this, db, uid });
        });
      }
      if (state.joins.length > 0) {
        applyJoins(qb, state.joins);
      }
      if (this.shouldUseDeepSort()) {
        return wrapWithDeepSort(qb, { qb: this, db, uid });
      }
      return qb;
    },
    async execute({ mapResults = true } = {}) {
      try {
        const qb = this.getKnexQuery();
        const transaction = transactionCtx.get();
        if (transaction) {
          qb.transacting(transaction);
        }
        const rows = await qb;
        if (state.populate && !_.isNil(rows)) {
          await applyPopulate(_.castArray(rows), state.populate, {
            qb: this,
            uid,
            db
          });
        }
        let results = rows;
        if (mapResults && state.type === "select") {
          results = fromRow(meta, rows);
        }
        return results;
      } catch (error) {
        if (error instanceof Error) {
          db.dialect.transformErrors(error);
        } else {
          throw error;
        }
      }
    },
    stream({ mapResults = true } = {}) {
      if (state.type === "select") {
        return new ReadableStrapiQuery({ qb: this, db, uid, mapResults });
      }
      throw new DatabaseError(
        `query-builder.stream() has been called with an unsupported query type: "${state.type}"`
      );
    }
  };
};
const withDefaultPagination = (params) => {
  const { page = 1, pageSize = 10, ...rest } = params;
  return {
    page: Number(page),
    pageSize: Number(pageSize),
    ...rest
  };
};
const withOffsetLimit = (params) => {
  const { page, pageSize, ...rest } = withDefaultPagination(params);
  const offset = Math.max(page - 1, 0) * pageSize;
  const limit = pageSize;
  const query = {
    ...rest,
    limit,
    offset
  };
  return [query, { page, pageSize }];
};
const createRepository = (uid, db) => {
  return {
    findOne(params = {}) {
      return db.entityManager.findOne(uid, params);
    },
    findMany(params = {}) {
      return db.entityManager.findMany(uid, params);
    },
    findWithCount(params = {}) {
      return Promise.all([
        db.entityManager.findMany(uid, params),
        db.entityManager.count(uid, params)
      ]);
    },
    async findPage(params) {
      const [query, { page, pageSize }] = withOffsetLimit(params);
      const [results, total] = await Promise.all([
        db.entityManager.findMany(uid, query),
        db.entityManager.count(uid, query)
      ]);
      return {
        results,
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total
        }
      };
    },
    create(params) {
      return db.entityManager.create(uid, params);
    },
    createMany(params) {
      return db.entityManager.createMany(uid, params);
    },
    update(params) {
      return db.entityManager.update(uid, params);
    },
    updateMany(params) {
      return db.entityManager.updateMany(uid, params);
    },
    delete(params) {
      return db.entityManager.delete(uid, params);
    },
    deleteMany(params = {}) {
      return db.entityManager.deleteMany(uid, params);
    },
    count(params) {
      return db.entityManager.count(uid, params);
    },
    attachRelations(id, data) {
      return db.entityManager.attachRelations(uid, id, data);
    },
    async updateRelations(id, data) {
      const trx = await db.transaction();
      try {
        await db.entityManager.updateRelations(uid, id, data, { transaction: trx.get() });
        return await trx.commit();
      } catch (e) {
        await trx.rollback();
        throw e;
      }
    },
    deleteRelations(id) {
      return db.entityManager.deleteRelations(uid, id);
    },
    populate(entity, populate) {
      return db.entityManager.populate(uid, entity, populate);
    },
    load(entity, fields, params) {
      return db.entityManager.load(uid, entity, fields, params);
    },
    async loadPages(entity, field, params) {
      if (!isString$1(field)) {
        throw new Error(`Invalid load. Expected ${field} to be a string`);
      }
      const { attributes } = db.metadata.get(uid);
      const attribute = attributes[field];
      if (!attribute || attribute.type !== "relation" || !attribute.relation || !["oneToMany", "manyToMany"].includes(attribute.relation)) {
        throw new Error(`Invalid load. Expected ${field} to be an anyToMany relational attribute`);
      }
      const [query, { page, pageSize }] = withOffsetLimit(params);
      const [results, { count: total }] = await Promise.all([
        db.entityManager.load(uid, entity, field, query),
        db.entityManager.load(uid, entity, field, { ...query, count: true })
      ]);
      return {
        results,
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total
        }
      };
    }
  };
};
const getMorphToManyRowsLinkedToMorphOne = (rows, {
  uid,
  attributeName,
  typeColumn,
  db
}) => rows.filter((row) => {
  const relatedType = row[typeColumn.name];
  const field = row.field;
  const targetAttribute = db.metadata.get(relatedType).attributes[field];
  return targetAttribute?.target === uid && targetAttribute?.morphBy === attributeName && targetAttribute?.relation === "morphOne";
});
const deleteRelatedMorphOneRelationsAfterMorphToManyUpdate = async (rows, {
  uid,
  attributeName,
  joinTable,
  db,
  transaction: trx
}) => {
  const { morphColumn } = joinTable;
  const { idColumn, typeColumn } = morphColumn;
  const morphOneRows = getMorphToManyRowsLinkedToMorphOne(rows, {
    uid,
    attributeName,
    typeColumn,
    db
  });
  const groupByType = groupBy(typeColumn.name);
  const groupByField = groupBy("field");
  const typeAndFieldIdsGrouped = pipe(groupByType, mapValues(groupByField))(morphOneRows);
  const orWhere = [];
  for (const [type, v] of Object.entries(typeAndFieldIdsGrouped)) {
    for (const [field, arr] of Object.entries(v)) {
      orWhere.push({
        [typeColumn.name]: type,
        field,
        [idColumn.name]: { $in: map(idColumn.name, arr) }
      });
    }
  }
  if (!isEmpty(orWhere)) {
    await createQueryBuilder(joinTable.name, db).delete().where({ $or: orWhere }).transacting(trx).execute();
  }
};
const encodePolymorphicId = (id, __type) => {
  return `${id}:::${__type}`;
};
const encodePolymorphicRelation = curry(({ idColumn, typeColumn }, relation) => {
  const newRelation = {
    ...relation,
    [idColumn]: encodePolymorphicId(relation[idColumn], relation[typeColumn])
  };
  if (relation.position) {
    const { before, after } = relation.position;
    const __type = relation.position.__type || relation.__type;
    newRelation.position = { ...relation.position };
    if (before) newRelation.position.before = encodePolymorphicId(before, __type);
    if (after) newRelation.position.after = encodePolymorphicId(after, __type);
  }
  return newRelation;
});
const getDocumentSiblingIdsQuery = (tableName, id) => {
  const models = Array.from(strapi.db.metadata.values());
  const isContentType = models.find((model) => {
    return model.tableName === tableName && model.attributes.documentId;
  });
  if (!isContentType) {
    return [id];
  }
  return function(query) {
    query.select("id").from(tableName).whereIn("document_id", (documentIDSubQuery) => {
      documentIDSubQuery.from(tableName).select("document_id").where("id", id);
    });
  };
};
const deletePreviousOneToAnyRelations = async ({
  id,
  attribute,
  relIdsToadd,
  db,
  transaction: trx
}) => {
  if (!(isBidirectional(attribute) && isOneToAny(attribute))) {
    throw new Error(
      "deletePreviousOneToAnyRelations can only be called for bidirectional oneToAny relations"
    );
  }
  const { joinTable } = attribute;
  const { joinColumn, inverseJoinColumn } = joinTable;
  const con = db.getConnection();
  await con.delete().from(joinTable.name).whereNotIn(joinColumn.name, getDocumentSiblingIdsQuery(joinColumn.referencedTable, id)).whereIn(inverseJoinColumn.name, relIdsToadd).where(joinTable.on || {}).transacting(trx);
  await cleanOrderColumns({ attribute, db, inverseRelIds: relIdsToadd, transaction: trx });
};
const deletePreviousAnyToOneRelations = async ({
  id,
  attribute,
  relIdToadd,
  db,
  transaction: trx
}) => {
  const { joinTable } = attribute;
  const { joinColumn, inverseJoinColumn } = joinTable;
  const con = db.getConnection();
  if (!isAnyToOne(attribute)) {
    throw new Error("deletePreviousAnyToOneRelations can only be called for anyToOne relations");
  }
  if (isManyToAny(attribute)) {
    const relsToDelete = await con.select(inverseJoinColumn.name).from(joinTable.name).where(joinColumn.name, id).whereNotIn(
      inverseJoinColumn.name,
      getDocumentSiblingIdsQuery(inverseJoinColumn.referencedTable, relIdToadd)
    ).where(joinTable.on || {}).transacting(trx);
    const relIdsToDelete = map(inverseJoinColumn.name, relsToDelete);
    await createQueryBuilder(joinTable.name, db).delete().where({
      [joinColumn.name]: id,
      [inverseJoinColumn.name]: { $in: relIdsToDelete }
    }).where(joinTable.on || {}).transacting(trx).execute();
    await cleanOrderColumns({ attribute, db, inverseRelIds: relIdsToDelete, transaction: trx });
  } else {
    await con.delete().from(joinTable.name).where(joinColumn.name, id).whereNotIn(
      inverseJoinColumn.name,
      getDocumentSiblingIdsQuery(inverseJoinColumn.referencedTable, relIdToadd)
    ).where(joinTable.on || {}).transacting(trx);
  }
};
const deleteRelations = async ({
  id,
  attribute,
  db,
  relIdsToNotDelete = [],
  relIdsToDelete = [],
  transaction: trx
}) => {
  const { joinTable } = attribute;
  const { joinColumn, inverseJoinColumn } = joinTable;
  const all = relIdsToDelete === "all";
  if (hasOrderColumn(attribute) || hasInverseOrderColumn(attribute)) {
    let lastId = 0;
    let done = false;
    const batchSize = 100;
    while (!done) {
      const batchToDelete = await createQueryBuilder(joinTable.name, db).select(inverseJoinColumn.name).where({
        [joinColumn.name]: id,
        id: { $gt: lastId },
        [inverseJoinColumn.name]: { $notIn: relIdsToNotDelete },
        ...all ? {} : { [inverseJoinColumn.name]: { $in: relIdsToDelete } }
      }).where(joinTable.on || {}).orderBy("id").limit(batchSize).transacting(trx).execute();
      done = batchToDelete.length < batchSize;
      lastId = batchToDelete[batchToDelete.length - 1]?.id || 0;
      const batchIds = map(inverseJoinColumn.name, batchToDelete);
      await createQueryBuilder(joinTable.name, db).delete().where({
        [joinColumn.name]: id,
        [inverseJoinColumn.name]: { $in: batchIds }
      }).where(joinTable.on || {}).transacting(trx).execute();
      await cleanOrderColumns({ attribute, db, id, inverseRelIds: batchIds, transaction: trx });
    }
  } else {
    await createQueryBuilder(joinTable.name, db).delete().where({
      [joinColumn.name]: id,
      [inverseJoinColumn.name]: { $notIn: relIdsToNotDelete },
      ...all ? {} : { [inverseJoinColumn.name]: { $in: relIdsToDelete } }
    }).where(joinTable.on || {}).transacting(trx).execute();
  }
};
const cleanOrderColumns = async ({
  id,
  attribute,
  db,
  inverseRelIds = [],
  transaction: trx
}) => {
  if (!(hasOrderColumn(attribute) && id) && !(hasInverseOrderColumn(attribute) && !isEmpty(inverseRelIds))) {
    return;
  }
  const { joinTable } = attribute;
  const { joinColumn, inverseJoinColumn, orderColumnName, inverseOrderColumnName } = joinTable;
  const updateOrderColumn = async () => {
    if (!hasOrderColumn(attribute) || !id) {
      return;
    }
    const selectRowsToOrder = (joinTableName) => db.connection(joinTableName).select("id").rowNumber("src_order", orderColumnName, joinColumn.name).where(joinColumn.name, id).toSQL();
    switch (strapi.db.dialect.client) {
      case "mysql": {
        const select = selectRowsToOrder(joinTable.name);
        await db.getConnection().raw(
          `UPDATE ?? as a, ( ${select.sql} ) AS b
            SET ?? = b.src_order
            WHERE b.id = a.id`,
          [joinTable.name, ...select.bindings, orderColumnName]
        ).transacting(trx);
        break;
      }
      default: {
        const joinTableName = addSchema(db, joinTable.name);
        const select = selectRowsToOrder(joinTableName);
        await db.connection.raw(
          `UPDATE ?? as a
            SET ?? = b.src_order
            FROM ( ${select.sql} ) AS b
            WHERE b.id = a.id`,
          [joinTableName, orderColumnName, ...select.bindings]
        ).transacting(trx);
      }
    }
  };
  const updateInverseOrderColumn = async () => {
    if (!hasInverseOrderColumn(attribute) || isEmpty(inverseRelIds)) return;
    const selectRowsToOrder = (joinTableName) => db.connection(joinTableName).select("id").rowNumber("inv_order", inverseOrderColumnName, inverseJoinColumn.name).where(inverseJoinColumn.name, "in", inverseRelIds).toSQL();
    switch (strapi.db.dialect.client) {
      case "mysql": {
        const select = selectRowsToOrder(joinTable.name);
        await db.getConnection().raw(
          `UPDATE ?? as a, ( ${select.sql} ) AS b
            SET ?? = b.inv_order
            WHERE b.id = a.id`,
          [joinTable.name, ...select.bindings, inverseOrderColumnName]
        ).transacting(trx);
        break;
      }
      default: {
        const joinTableName = addSchema(db, joinTable.name);
        const select = selectRowsToOrder(joinTableName);
        await db.connection.raw(
          `UPDATE ?? as a
            SET ?? = b.inv_order
            FROM ( ${select.sql} ) AS b
            WHERE b.id = a.id`,
          [joinTableName, inverseOrderColumnName, ...select.bindings]
        ).transacting(trx);
      }
    }
  };
  return Promise.all([updateOrderColumn(), updateInverseOrderColumn()]);
};
const sortConnectArray = (connectArr, initialArr = [], strictSort = true) => {
  const sortedConnect = [];
  let needsSorting = false;
  const relationInInitialArray = initialArr.reduce(
    (acc, rel) => ({ ...acc, [rel.id]: true }),
    {}
  );
  const mappedRelations = connectArr.reduce(
    (mapper, relation) => {
      const adjacentRelId = relation.position?.before || relation.position?.after;
      if (!adjacentRelId || !relationInInitialArray[adjacentRelId] && !mapper[adjacentRelId]) {
        needsSorting = true;
      }
      const existingRelation = mapper[relation.id];
      const hasNoComponent = existingRelation && !("__component" in existingRelation);
      const hasSameComponent = existingRelation && existingRelation.__component === relation.__component;
      if (existingRelation && (hasNoComponent || hasSameComponent)) {
        throw new InvalidRelationError(
          `The relation with id ${relation.id} is already connected. You cannot connect the same relation twice.`
        );
      }
      return {
        [relation.id]: { ...relation, computed: false },
        ...mapper
      };
    },
    {}
  );
  if (!needsSorting) return connectArr;
  const computeRelation = (relation, relationsSeenInBranch) => {
    const adjacentRelId = relation.position?.before || relation.position?.after;
    const adjacentRelation = mappedRelations[adjacentRelId];
    if (adjacentRelId && relationsSeenInBranch[adjacentRelId]) {
      throw new InvalidRelationError(
        "A circular reference was found in the connect array. One relation is trying to connect before/after another one that is trying to connect before/after it"
      );
    }
    if (mappedRelations[relation.id]?.computed) {
      return;
    }
    mappedRelations[relation.id].computed = true;
    if (!adjacentRelId || relationInInitialArray[adjacentRelId]) {
      sortedConnect.push(relation);
      return;
    }
    if (mappedRelations[adjacentRelId]) {
      computeRelation(adjacentRelation, { ...relationsSeenInBranch, [relation.id]: true });
      sortedConnect.push(relation);
    } else if (strictSort) {
      throw new InvalidRelationError(
        `There was a problem connecting relation with id ${relation.id} at position ${JSON.stringify(
          relation.position
        )}. The relation with id ${adjacentRelId} needs to be connected first.`
      );
    } else {
      sortedConnect.push({ id: relation.id, position: { end: true } });
    }
  };
  connectArr.forEach((relation) => computeRelation(relation, {}));
  return sortedConnect;
};
const relationsOrderer = (initArr, idColumn, orderColumn, strict2) => {
  const computedRelations = castArray(initArr ?? []).map((r) => ({
    init: true,
    id: r[idColumn],
    order: Number(r[orderColumn]) || 1
  }));
  const maxOrder = maxBy("order", computedRelations)?.order || 0;
  const findRelation = (id) => {
    const idx = computedRelations.findIndex((r) => r.id === id);
    return { idx, relation: computedRelations[idx] };
  };
  const removeRelation = (r) => {
    const { idx } = findRelation(r.id);
    if (idx >= 0) {
      computedRelations.splice(idx, 1);
    }
  };
  const insertRelation = (r) => {
    let idx;
    if (r.position?.before) {
      const { idx: _idx, relation } = findRelation(r.position.before);
      if (relation.init) {
        r.order = relation.order - 0.5;
      } else {
        r.order = relation.order;
      }
      idx = _idx;
    } else if (r.position?.after) {
      const { idx: _idx, relation } = findRelation(r.position.after);
      if (relation.init) {
        r.order = relation.order + 0.5;
      } else {
        r.order = relation.order;
      }
      idx = _idx + 1;
    } else if (r.position?.start) {
      r.order = 0.5;
      idx = 0;
    } else {
      r.order = maxOrder + 0.5;
      idx = computedRelations.length;
    }
    computedRelations.splice(idx, 0, r);
  };
  return {
    disconnect(relations) {
      castArray(relations).forEach((relation) => {
        removeRelation(relation);
      });
      return this;
    },
    connect(relations) {
      sortConnectArray(castArray(relations), computedRelations, strict2).forEach((relation) => {
        this.disconnect(relation);
        try {
          insertRelation(relation);
        } catch (err) {
          throw new Error(
            `There was a problem connecting relation with id ${relation.id} at position ${JSON.stringify(
              relation.position
            )}. The list of connect relations is not valid`
          );
        }
      });
      return this;
    },
    get() {
      return computedRelations;
    },
    /**
     * Get a map between the relation id and its order
     */
    getOrderMap() {
      return _$1(computedRelations).groupBy("order").reduce(
        (acc, relations) => {
          if (relations[0]?.init) return acc;
          relations.forEach((relation, idx) => {
            acc[relation.id] = Math.floor(relation.order) + (idx + 1) / (relations.length + 1);
          });
          return acc;
        },
        {}
      );
    }
  };
};
const isRecord = (value) => isObject(value) && !isNil(value);
const toId = (value) => {
  if (isRecord(value) && "id" in value && isValidId(value.id)) {
    return value.id;
  }
  if (isValidId(value)) {
    return value;
  }
  throw new Error(`Invalid id, expected a string or integer, got ${JSON.stringify(value)}`);
};
const toIds = (value) => castArray(value || []).map(toId);
const isValidId = (value) => isString$1(value) || isInteger(value);
const isValidObjectId = (value) => isRecord(value) && "id" in value && isValidId(value.id);
const toIdArray = (data) => {
  const array = castArray(data).filter((datum) => !isNil(datum)).map((datum) => {
    if (isValidId(datum)) {
      return { id: datum, __pivot: {} };
    }
    if (!isValidObjectId(datum)) {
      throw new Error(`Invalid id, expected a string or integer, got ${datum}`);
    }
    return datum;
  });
  return uniqWith(isEqual, array);
};
const toAssocs = (data) => {
  if (isArray(data) || isString$1(data) || isNumber$1(data) || isNull(data) || isRecord(data) && "id" in data) {
    return {
      set: isNull(data) ? data : toIdArray(data)
    };
  }
  if (data?.set) {
    return {
      set: isNull(data.set) ? data.set : toIdArray(data.set)
    };
  }
  return {
    options: {
      strict: data?.options?.strict
    },
    connect: toIdArray(data?.connect).map((elm) => ({
      id: elm.id,
      position: elm.position ? elm.position : { end: true },
      __pivot: elm.__pivot ?? {},
      __type: elm.__type
    })),
    disconnect: toIdArray(data?.disconnect)
  };
};
const processData = (metadata, data = {}, { withDefaults = false } = {}) => {
  const { attributes } = metadata;
  const obj = {};
  for (const attributeName of Object.keys(attributes)) {
    const attribute = attributes[attributeName];
    if (isScalarAttribute(attribute)) {
      const field = createField(attribute);
      if (isUndefined(data[attributeName])) {
        if (!isUndefined(attribute.default) && withDefaults) {
          if (typeof attribute.default === "function") {
            obj[attributeName] = attribute.default();
          } else {
            obj[attributeName] = attribute.default;
          }
        }
        continue;
      }
      if ("validate" in field && typeof field.validate === "function" && data[attributeName] !== null) {
        field.validate(data[attributeName]);
      }
      const val = data[attributeName] === null ? null : field.toDB(data[attributeName]);
      obj[attributeName] = val;
    }
    if (isRelationalAttribute(attribute)) {
      if ("joinColumn" in attribute && attribute.joinColumn && attribute.owner) {
        const joinColumnName = attribute.joinColumn.name;
        const attrValue = !isUndefined(data[attributeName]) ? data[attributeName] : data[joinColumnName];
        if (isNull(attrValue)) {
          obj[joinColumnName] = attrValue;
        } else if (!isUndefined(attrValue)) {
          obj[joinColumnName] = toId(attrValue);
        }
        continue;
      }
      if ("morphColumn" in attribute && attribute.morphColumn && attribute.owner) {
        const { idColumn, typeColumn, typeField = "__type" } = attribute.morphColumn;
        const value = data[attributeName];
        if (value === null) {
          Object.assign(obj, {
            [idColumn.name]: null,
            [typeColumn.name]: null
          });
          continue;
        }
        if (!isUndefined(value)) {
          if (!has("id", value) || !has(typeField, value)) {
            throw new Error(`Expects properties ${typeField} an id to make a morph association`);
          }
          Object.assign(obj, {
            [idColumn.name]: value.id,
            [typeColumn.name]: value[typeField]
          });
        }
      }
    }
  }
  return obj;
};
const createEntityManager = (db) => {
  const repoMap = {};
  return {
    async findOne(uid, params) {
      const states = await db.lifecycles.run("beforeFindOne", uid, { params });
      const result = await this.createQueryBuilder(uid).init(params).first().execute();
      await db.lifecycles.run("afterFindOne", uid, { params, result }, states);
      return result;
    },
    // should we name it findOne because people are used to it ?
    async findMany(uid, params) {
      const states = await db.lifecycles.run("beforeFindMany", uid, { params });
      const result = await this.createQueryBuilder(uid).init(params).execute();
      await db.lifecycles.run("afterFindMany", uid, { params, result }, states);
      return result;
    },
    async count(uid, params = {}) {
      const states = await db.lifecycles.run("beforeCount", uid, { params });
      const res = await this.createQueryBuilder(uid).init(pick(["_q", "where", "filters"], params)).count().first().execute();
      const result = Number(res.count);
      await db.lifecycles.run("afterCount", uid, { params, result }, states);
      return result;
    },
    async create(uid, params = {}) {
      const states = await db.lifecycles.run("beforeCreate", uid, { params });
      const metadata = db.metadata.get(uid);
      const { data } = params;
      if (!isPlainObject(data)) {
        throw new Error("Create expects a data object");
      }
      const dataToInsert = processData(metadata, data, { withDefaults: true });
      const res = await this.createQueryBuilder(uid).insert(dataToInsert).execute();
      const id = isRecord(res[0]) ? res[0].id : res[0];
      const trx = await strapi.db.transaction();
      try {
        await this.attachRelations(uid, id, data, { transaction: trx.get() });
        await trx.commit();
      } catch (e) {
        await trx.rollback();
        await this.createQueryBuilder(uid).where({ id }).delete().execute();
        throw e;
      }
      const result = await this.findOne(uid, {
        where: { id },
        select: params.select,
        populate: params.populate,
        filters: params.filters
      });
      await db.lifecycles.run("afterCreate", uid, { params, result }, states);
      return result;
    },
    // TODO: where do we handle relation processing for many queries ?
    async createMany(uid, params = {}) {
      const states = await db.lifecycles.run("beforeCreateMany", uid, { params });
      const metadata = db.metadata.get(uid);
      const { data } = params;
      if (!isArray(data)) {
        throw new Error("CreateMany expects data to be an array");
      }
      const dataToInsert = data.map(
        (datum) => processData(metadata, datum, { withDefaults: true })
      );
      if (isEmpty(dataToInsert)) {
        throw new Error("Nothing to insert");
      }
      const createdEntries = await this.createQueryBuilder(uid).insert(dataToInsert).execute();
      const result = {
        count: data.length,
        ids: createdEntries.map((entry) => typeof entry === "object" ? entry?.id : entry)
      };
      await db.lifecycles.run("afterCreateMany", uid, { params, result }, states);
      return result;
    },
    async update(uid, params = {}) {
      const states = await db.lifecycles.run("beforeUpdate", uid, { params });
      const metadata = db.metadata.get(uid);
      const { where, data } = params;
      if (!isPlainObject(data)) {
        throw new Error("Update requires a data object");
      }
      if (isEmpty(where)) {
        throw new Error("Update requires a where parameter");
      }
      const entity = await this.createQueryBuilder(uid).select("*").where(where).first().execute({ mapResults: false });
      if (!entity) {
        return null;
      }
      const { id } = entity;
      const dataToUpdate = processData(metadata, data);
      if (!isEmpty(dataToUpdate)) {
        await this.createQueryBuilder(uid).where({ id }).update(dataToUpdate).execute();
      }
      const trx = await strapi.db.transaction();
      try {
        await this.updateRelations(uid, id, data, { transaction: trx.get() });
        await trx.commit();
      } catch (e) {
        await trx.rollback();
        await this.createQueryBuilder(uid).where({ id }).update(entity).execute();
        throw e;
      }
      const result = await this.findOne(uid, {
        where: { id },
        select: params.select,
        populate: params.populate,
        filters: params.filters
      });
      await db.lifecycles.run("afterUpdate", uid, { params, result }, states);
      return result;
    },
    // TODO: where do we handle relation processing for many queries ?
    async updateMany(uid, params = {}) {
      const states = await db.lifecycles.run("beforeUpdateMany", uid, { params });
      const metadata = db.metadata.get(uid);
      const { where, data } = params;
      const dataToUpdate = processData(metadata, data);
      if (isEmpty(dataToUpdate)) {
        throw new Error("Update requires data");
      }
      const updatedRows = await this.createQueryBuilder(uid).where(where).update(dataToUpdate).execute();
      const result = { count: updatedRows };
      await db.lifecycles.run("afterUpdateMany", uid, { params, result }, states);
      return result;
    },
    async delete(uid, params = {}) {
      const states = await db.lifecycles.run("beforeDelete", uid, { params });
      const { where, select, populate } = params;
      if (isEmpty(where)) {
        throw new Error("Delete requires a where parameter");
      }
      const entity = await this.findOne(uid, {
        select: select && ["id"].concat(select),
        where,
        populate
      });
      if (!entity) {
        return null;
      }
      const { id } = entity;
      await this.createQueryBuilder(uid).where({ id }).delete().execute();
      const trx = await strapi.db.transaction();
      try {
        await this.deleteRelations(uid, id, { transaction: trx.get() });
        await trx.commit();
      } catch (e) {
        await trx.rollback();
        throw e;
      }
      await db.lifecycles.run("afterDelete", uid, { params, result: entity }, states);
      return entity;
    },
    // TODO: where do we handle relation processing for many queries ?
    async deleteMany(uid, params = {}) {
      const states = await db.lifecycles.run("beforeDeleteMany", uid, { params });
      const { where } = params;
      const deletedRows = await this.createQueryBuilder(uid).where(where).delete().execute();
      const result = { count: deletedRows };
      await db.lifecycles.run("afterDeleteMany", uid, { params, result }, states);
      return result;
    },
    /**
     * Attach relations to a new entity
     */
    async attachRelations(uid, id, data, options) {
      const { attributes } = db.metadata.get(uid);
      const { transaction: trx } = options ?? {};
      for (const attributeName of Object.keys(attributes)) {
        const attribute = attributes[attributeName];
        const isValidLink = has(attributeName, data) && !isNil(data[attributeName]);
        if (attribute.type !== "relation" || !isValidLink) {
          continue;
        }
        const cleanRelationData = toAssocs(data[attributeName]);
        if (attribute.relation === "morphOne" || attribute.relation === "morphMany") {
          const { target, morphBy } = attribute;
          const targetAttribute = db.metadata.get(target).attributes[morphBy];
          if (targetAttribute.type !== "relation") {
            throw new Error(
              `Expected target attribute ${target}.${morphBy} to be a relation attribute`
            );
          }
          if (targetAttribute.relation === "morphToOne") {
            const { idColumn, typeColumn } = targetAttribute.morphColumn;
            const relId = toId(cleanRelationData.set?.[0]);
            await this.createQueryBuilder(target).update({ [idColumn.name]: id, [typeColumn.name]: uid }).where({ id: relId }).transacting(trx).execute();
          } else if (targetAttribute.relation === "morphToMany") {
            const { joinTable } = targetAttribute;
            const { joinColumn, morphColumn } = joinTable;
            const { idColumn, typeColumn } = morphColumn;
            if (isEmpty(cleanRelationData.set)) {
              continue;
            }
            const rows = cleanRelationData.set?.map((data2, idx) => {
              return {
                [joinColumn.name]: data2.id,
                [idColumn.name]: id,
                [typeColumn.name]: uid,
                ..."on" in joinTable && joinTable.on || {},
                ...data2.__pivot || {},
                order: idx + 1,
                field: attributeName
              };
            }) ?? [];
            await this.createQueryBuilder(joinTable.name).insert(rows).transacting(trx).execute();
          }
          continue;
        } else if (attribute.relation === "morphToOne") {
          continue;
        } else if (attribute.relation === "morphToMany") {
          const { joinTable } = attribute;
          const { joinColumn, morphColumn } = joinTable;
          const { idColumn, typeColumn, typeField = "__type" } = morphColumn;
          if (isEmpty(cleanRelationData.set) && isEmpty(cleanRelationData.connect)) {
            continue;
          }
          const dataset = cleanRelationData.set || cleanRelationData.connect || [];
          const rows = dataset.map((data2, idx) => ({
            [joinColumn.name]: id,
            [idColumn.name]: data2.id,
            [typeColumn.name]: data2[typeField],
            ..."on" in joinTable && joinTable.on || {},
            ...data2.__pivot || {},
            order: idx + 1
          }));
          const orderMap = relationsOrderer(
            [],
            morphColumn.idColumn.name,
            "order",
            true
            // Always make a strict connect when inserting
          ).connect(
            // Merge id & __type to get a single id key
            dataset.map(encodePolymorphicRelation({ idColumn: "id", typeColumn: "__type" }))
          ).get().reduce((acc, rel, idx) => ({ ...acc, [rel.id]: idx }), {});
          rows.forEach((row) => {
            const rowId = row[morphColumn.idColumn.name];
            const rowType = row[morphColumn.typeColumn.name];
            const encodedId = encodePolymorphicId(rowId, rowType);
            row.order = orderMap[encodedId];
          });
          await this.createQueryBuilder(joinTable.name).insert(rows).transacting(trx).execute();
          continue;
        }
        if ("joinColumn" in attribute && attribute.joinColumn && attribute.owner) {
          const relIdsToAdd = toIds(cleanRelationData.set);
          if (attribute.relation === "oneToOne" && isBidirectional(attribute) && relIdsToAdd.length) {
            await this.createQueryBuilder(uid).where({ [attribute.joinColumn.name]: relIdsToAdd, id: { $ne: id } }).update({ [attribute.joinColumn.name]: null }).transacting(trx).execute();
          }
          continue;
        }
        if ("joinColumn" in attribute && attribute.joinColumn && !attribute.owner) {
          const { target } = attribute;
          const relIdsToAdd = toIds(cleanRelationData.set);
          await this.createQueryBuilder(target).where({ [attribute.joinColumn.referencedColumn]: id }).update({ [attribute.joinColumn.referencedColumn]: null }).transacting(trx).execute();
          await this.createQueryBuilder(target).update({ [attribute.joinColumn.referencedColumn]: id }).where({ id: relIdsToAdd }).transacting(trx).execute();
        }
        if ("joinTable" in attribute && attribute.joinTable) {
          const { joinTable } = attribute;
          const { joinColumn, inverseJoinColumn, orderColumnName, inverseOrderColumnName } = joinTable;
          const relsToAdd = (cleanRelationData.set || cleanRelationData.connect) ?? [];
          const relIdsToadd = toIds(relsToAdd);
          if (isBidirectional(attribute) && isOneToAny(attribute)) {
            await deletePreviousOneToAnyRelations({
              id,
              attribute,
              relIdsToadd,
              db,
              transaction: trx
            });
          }
          const insert = uniqBy("id", relsToAdd).map((data2) => {
            return {
              [joinColumn.name]: id,
              [inverseJoinColumn.name]: data2.id,
              ..."on" in joinTable && joinTable.on || {},
              ...data2.__pivot || {}
            };
          });
          if (cleanRelationData.set && hasOrderColumn(attribute)) {
            insert.forEach((data2, idx) => {
              data2[orderColumnName] = idx + 1;
            });
          } else if (cleanRelationData.connect && hasOrderColumn(attribute)) {
            const orderMap = relationsOrderer(
              [],
              inverseJoinColumn.name,
              joinTable.orderColumnName,
              true
              // Always make an strict connect when inserting
            ).connect(relsToAdd).get().reduce((acc, rel, idx) => ({ ...acc, [rel.id]: idx }), {});
            insert.forEach((row) => {
              row[orderColumnName] = orderMap[row[inverseJoinColumn.name]];
            });
          }
          if (hasInverseOrderColumn(attribute)) {
            const maxResults = await db.getConnection().select(inverseJoinColumn.name).max(inverseOrderColumnName, { as: "max" }).whereIn(inverseJoinColumn.name, relIdsToadd).where(joinTable.on || {}).groupBy(inverseJoinColumn.name).from(joinTable.name).transacting(trx);
            const maxMap = maxResults.reduce(
              (acc, res) => Object.assign(acc, { [res[inverseJoinColumn.name]]: res.max }),
              {}
            );
            insert.forEach((rel) => {
              rel[inverseOrderColumnName] = (maxMap[rel[inverseJoinColumn.name]] || 0) + 1;
            });
          }
          if (insert.length === 0) {
            continue;
          }
          await this.createQueryBuilder(joinTable.name).insert(insert).transacting(trx).execute();
        }
      }
    },
    /**
     * Updates relations of an existing entity
     */
    // TODO: check relation exists (handled by FKs except for polymorphics)
    async updateRelations(uid, id, data, options) {
      const { attributes } = db.metadata.get(uid);
      const { transaction: trx } = options ?? {};
      for (const attributeName of Object.keys(attributes)) {
        const attribute = attributes[attributeName];
        if (attribute.type !== "relation" || !has(attributeName, data)) {
          continue;
        }
        const cleanRelationData = toAssocs(data[attributeName]);
        if (attribute.relation === "morphOne" || attribute.relation === "morphMany") {
          const { target, morphBy } = attribute;
          const targetAttribute = db.metadata.get(target).attributes[morphBy];
          if (targetAttribute.type === "relation" && targetAttribute.relation === "morphToOne") {
            const { idColumn, typeColumn } = targetAttribute.morphColumn;
            await this.createQueryBuilder(target).update({ [idColumn.name]: null, [typeColumn.name]: null }).where({ [idColumn.name]: id, [typeColumn.name]: uid }).transacting(trx).execute();
            if (!isNull(cleanRelationData.set)) {
              const relId = toIds(cleanRelationData.set?.[0]);
              await this.createQueryBuilder(target).update({ [idColumn.name]: id, [typeColumn.name]: uid }).where({ id: relId }).transacting(trx).execute();
            }
          } else if (targetAttribute.type === "relation" && targetAttribute.relation === "morphToMany") {
            const { joinTable } = targetAttribute;
            const { joinColumn, morphColumn } = joinTable;
            const { idColumn, typeColumn } = morphColumn;
            const hasSet = !isEmpty(cleanRelationData.set);
            const hasConnect = !isEmpty(cleanRelationData.connect);
            const hasDisconnect = !isEmpty(cleanRelationData.disconnect);
            if (!hasSet && (hasConnect || hasDisconnect)) {
              const idsToDelete = [
                ...cleanRelationData.disconnect || [],
                ...cleanRelationData.connect || []
              ];
              if (!isEmpty(idsToDelete)) {
                const where = {
                  $or: idsToDelete.map((item) => {
                    return {
                      [idColumn.name]: id,
                      [typeColumn.name]: uid,
                      [joinColumn.name]: item.id,
                      ...joinTable.on || {},
                      field: attributeName
                    };
                  })
                };
                await this.createQueryBuilder(joinTable.name).delete().where(where).transacting(trx).execute();
              }
              if (hasConnect) {
                const start = await this.createQueryBuilder(joinTable.name).where({
                  [idColumn.name]: id,
                  [typeColumn.name]: uid,
                  ...joinTable.on || {},
                  ...data.__pivot || {}
                }).max("order").first().transacting(trx).execute();
                const startOrder = start?.max || 0;
                const rows = (cleanRelationData.connect ?? []).map((data2, idx) => ({
                  [joinColumn.name]: data2.id,
                  [idColumn.name]: id,
                  [typeColumn.name]: uid,
                  ...joinTable.on || {},
                  ...data2.__pivot || {},
                  order: startOrder + idx + 1,
                  field: attributeName
                }));
                await this.createQueryBuilder(joinTable.name).insert(rows).transacting(trx).execute();
              }
              continue;
            }
            await this.createQueryBuilder(joinTable.name).delete().where({
              [idColumn.name]: id,
              [typeColumn.name]: uid,
              ...joinTable.on || {},
              field: attributeName
            }).transacting(trx).execute();
            if (hasSet) {
              const rows = (cleanRelationData.set ?? []).map((data2, idx) => ({
                [joinColumn.name]: data2.id,
                [idColumn.name]: id,
                [typeColumn.name]: uid,
                ...joinTable.on || {},
                ...data2.__pivot || {},
                order: idx + 1,
                field: attributeName
              }));
              await this.createQueryBuilder(joinTable.name).insert(rows).transacting(trx).execute();
            }
          }
          continue;
        }
        if (attribute.relation === "morphToOne") {
          continue;
        }
        if (attribute.relation === "morphToMany") {
          const { joinTable } = attribute;
          const { joinColumn, morphColumn } = joinTable;
          const { idColumn, typeColumn, typeField = "__type" } = morphColumn;
          const hasSet = !isEmpty(cleanRelationData.set);
          const hasConnect = !isEmpty(cleanRelationData.connect);
          const hasDisconnect = !isEmpty(cleanRelationData.disconnect);
          if (!hasSet && (hasConnect || hasDisconnect)) {
            const idsToDelete = [
              ...cleanRelationData.disconnect || [],
              ...cleanRelationData.connect || []
            ];
            const rowsToDelete = [
              ...(cleanRelationData.disconnect ?? []).map((data2, idx) => ({
                [joinColumn.name]: id,
                [idColumn.name]: data2.id,
                [typeColumn.name]: data2[typeField],
                ..."on" in joinTable && joinTable.on || {},
                ...data2.__pivot || {},
                order: idx + 1
              })),
              ...(cleanRelationData.connect ?? []).map((data2, idx) => ({
                [joinColumn.name]: id,
                [idColumn.name]: data2.id,
                // @ts-expect-error TODO
                [typeColumn.name]: data2[typeField],
                ..."on" in joinTable && joinTable.on || {},
                ...data2.__pivot || {},
                order: idx + 1
              }))
            ];
            const adjacentRelations = await this.createQueryBuilder(joinTable.name).where({
              $or: [
                {
                  [joinColumn.name]: id,
                  [idColumn.name]: {
                    $in: compact(
                      cleanRelationData.connect?.map(
                        (r) => r.position?.after || r.position?.before
                      )
                    )
                  }
                },
                {
                  [joinColumn.name]: id,
                  order: this.createQueryBuilder(joinTable.name).max("order").where({ [joinColumn.name]: id }).where(joinTable.on || {}).transacting(trx).getKnexQuery()
                }
              ]
            }).where(joinTable.on || {}).transacting(trx).execute();
            if (!isEmpty(idsToDelete)) {
              const where = {
                $or: idsToDelete.map((item) => {
                  return {
                    [idColumn.name]: item.id,
                    [typeColumn.name]: item[typeField],
                    [joinColumn.name]: id,
                    ...joinTable.on || {}
                  };
                })
              };
              await this.createQueryBuilder(joinTable.name).delete().where(where).transacting(trx).execute();
              await deleteRelatedMorphOneRelationsAfterMorphToManyUpdate(rowsToDelete, {
                uid,
                attributeName,
                joinTable,
                db,
                transaction: trx
              });
            }
            if (hasConnect) {
              const dataset = cleanRelationData.connect || [];
              const rows = dataset.map((data2) => ({
                [joinColumn.name]: id,
                [idColumn.name]: data2.id,
                [typeColumn.name]: data2[typeField],
                ...joinTable.on || {},
                ...data2.__pivot || {},
                field: attributeName
              }));
              const orderMap = relationsOrderer(
                // Merge id & __type to get a single id key
                adjacentRelations.map(
                  encodePolymorphicRelation({
                    idColumn: idColumn.name,
                    typeColumn: typeColumn.name
                  })
                ),
                idColumn.name,
                "order",
                cleanRelationData.options?.strict
              ).connect(
                // Merge id & __type to get a single id key
                dataset.map(encodePolymorphicRelation({ idColumn: "id", typeColumn: "__type" }))
              ).getOrderMap();
              rows.forEach((row) => {
                const rowId = row[idColumn.name];
                const rowType = row[typeColumn.name];
                const encodedId = encodePolymorphicId(rowId, rowType);
                row.order = orderMap[encodedId];
              });
              await this.createQueryBuilder(joinTable.name).insert(rows).transacting(trx).execute();
            }
            continue;
          }
          if (hasSet) {
            await this.createQueryBuilder(joinTable.name).delete().where({
              [joinColumn.name]: id,
              ...joinTable.on || {}
            }).transacting(trx).execute();
            const rows = (cleanRelationData.set ?? []).map((data2, idx) => ({
              [joinColumn.name]: id,
              [idColumn.name]: data2.id,
              [typeColumn.name]: data2[typeField],
              field: attributeName,
              ...joinTable.on || {},
              ...data2.__pivot || {},
              order: idx + 1
            }));
            await deleteRelatedMorphOneRelationsAfterMorphToManyUpdate(rows, {
              uid,
              attributeName,
              joinTable,
              db,
              transaction: trx
            });
            await this.createQueryBuilder(joinTable.name).insert(rows).transacting(trx).execute();
          }
          continue;
        }
        if ("joinColumn" in attribute && attribute.joinColumn && attribute.owner) {
          continue;
        }
        if ("joinColumn" in attribute && attribute.joinColumn && !attribute.owner) {
          const { target } = attribute;
          await this.createQueryBuilder(target).where({ [attribute.joinColumn.referencedColumn]: id }).update({ [attribute.joinColumn.referencedColumn]: null }).transacting(trx).execute();
          if (!isNull(cleanRelationData.set)) {
            const relIdsToAdd = toIds(cleanRelationData.set);
            await this.createQueryBuilder(target).where({ id: relIdsToAdd }).update({ [attribute.joinColumn.referencedColumn]: id }).transacting(trx).execute();
          }
        }
        if (attribute.joinTable) {
          const { joinTable } = attribute;
          const { joinColumn, inverseJoinColumn, orderColumnName, inverseOrderColumnName } = joinTable;
          const select = [joinColumn.name, inverseJoinColumn.name];
          if (hasOrderColumn(attribute)) {
            select.push(orderColumnName);
          }
          if (hasInverseOrderColumn(attribute)) {
            select.push(inverseOrderColumnName);
          }
          if (isNull(cleanRelationData.set)) {
            await deleteRelations({ id, attribute, db, relIdsToDelete: "all", transaction: trx });
          } else {
            const isPartialUpdate = !has("set", cleanRelationData);
            let relIdsToaddOrMove;
            if (isPartialUpdate) {
              if (isAnyToOne(attribute)) ;
              relIdsToaddOrMove = toIds(cleanRelationData.connect);
              const relIdsToDelete = toIds(
                differenceWith(
                  isEqual,
                  cleanRelationData.disconnect,
                  cleanRelationData.connect ?? []
                )
              );
              if (!isEmpty(relIdsToDelete)) {
                await deleteRelations({ id, attribute, db, relIdsToDelete, transaction: trx });
              }
              if (isEmpty(cleanRelationData.connect)) {
                continue;
              }
              let currentMovingRels = [];
              if (hasOrderColumn(attribute) || hasInverseOrderColumn(attribute)) {
                currentMovingRels = await this.createQueryBuilder(joinTable.name).select(select).where({
                  [joinColumn.name]: id,
                  [inverseJoinColumn.name]: { $in: relIdsToaddOrMove }
                }).where(joinTable.on || {}).transacting(trx).execute();
              }
              const insert = uniqBy("id", cleanRelationData.connect).map((relToAdd) => ({
                [joinColumn.name]: id,
                [inverseJoinColumn.name]: relToAdd.id,
                ...joinTable.on || {},
                ...relToAdd.__pivot || {}
              }));
              if (hasOrderColumn(attribute)) {
                const adjacentRelations = await this.createQueryBuilder(joinTable.name).where({
                  $or: [
                    {
                      [joinColumn.name]: id,
                      [inverseJoinColumn.name]: {
                        $in: compact(
                          cleanRelationData.connect?.map(
                            (r) => r.position?.after || r.position?.before
                          )
                        )
                      }
                    },
                    {
                      [joinColumn.name]: id,
                      [orderColumnName]: this.createQueryBuilder(joinTable.name).max(orderColumnName).where({ [joinColumn.name]: id }).where(joinTable.on || {}).transacting(trx).getKnexQuery()
                    }
                  ]
                }).where(joinTable.on || {}).transacting(trx).execute();
                const orderMap = relationsOrderer(
                  adjacentRelations,
                  inverseJoinColumn.name,
                  joinTable.orderColumnName,
                  cleanRelationData.options?.strict
                ).connect(cleanRelationData.connect ?? []).getOrderMap();
                insert.forEach((row) => {
                  row[orderColumnName] = orderMap[row[inverseJoinColumn.name]];
                });
              }
              if (hasInverseOrderColumn(attribute)) {
                const nonExistingRelsIds = difference(
                  relIdsToaddOrMove,
                  map(inverseJoinColumn.name, currentMovingRels)
                );
                const maxResults = await db.getConnection().select(inverseJoinColumn.name).max(inverseOrderColumnName, { as: "max" }).whereIn(inverseJoinColumn.name, nonExistingRelsIds).where(joinTable.on || {}).groupBy(inverseJoinColumn.name).from(joinTable.name).transacting(trx);
                const maxMap = maxResults.reduce(
                  (acc, res) => Object.assign(acc, { [res[inverseJoinColumn.name]]: res.max }),
                  {}
                );
                insert.forEach((row) => {
                  row[inverseOrderColumnName] = (maxMap[row[inverseJoinColumn.name]] || 0) + 1;
                });
              }
              const query = this.createQueryBuilder(joinTable.name).insert(insert).onConflict(joinTable.pivotColumns).transacting(trx);
              if (hasOrderColumn(attribute)) {
                query.merge([orderColumnName]);
              } else {
                query.ignore();
              }
              await query.execute();
              await cleanOrderColumns({ attribute, db, id, transaction: trx });
            } else {
              if (isAnyToOne(attribute)) {
                cleanRelationData.set = cleanRelationData.set?.slice(-1);
              }
              relIdsToaddOrMove = toIds(cleanRelationData.set);
              await deleteRelations({
                id,
                attribute,
                db,
                relIdsToDelete: "all",
                relIdsToNotDelete: relIdsToaddOrMove,
                transaction: trx
              });
              if (isEmpty(cleanRelationData.set)) {
                continue;
              }
              const insert = uniqBy("id", cleanRelationData.set).map((relToAdd) => ({
                [joinColumn.name]: id,
                [inverseJoinColumn.name]: relToAdd.id,
                ...joinTable.on || {},
                ...relToAdd.__pivot || {}
              }));
              if (hasOrderColumn(attribute)) {
                insert.forEach((row, idx) => {
                  row[orderColumnName] = idx + 1;
                });
              }
              if (hasInverseOrderColumn(attribute)) {
                const existingRels = await this.createQueryBuilder(joinTable.name).select(inverseJoinColumn.name).where({
                  [joinColumn.name]: id,
                  [inverseJoinColumn.name]: { $in: relIdsToaddOrMove }
                }).where(joinTable.on || {}).transacting(trx).execute();
                const inverseRelsIds = map(inverseJoinColumn.name, existingRels);
                const nonExistingRelsIds = difference(relIdsToaddOrMove, inverseRelsIds);
                const maxResults = await db.getConnection().select(inverseJoinColumn.name).max(inverseOrderColumnName, { as: "max" }).whereIn(inverseJoinColumn.name, nonExistingRelsIds).where(joinTable.on || {}).groupBy(inverseJoinColumn.name).from(joinTable.name).transacting(trx);
                const maxMap = maxResults.reduce(
                  (acc, res) => Object.assign(acc, { [res[inverseJoinColumn.name]]: res.max }),
                  {}
                );
                insert.forEach((row) => {
                  row[inverseOrderColumnName] = (maxMap[row[inverseJoinColumn.name]] || 0) + 1;
                });
              }
              const query = this.createQueryBuilder(joinTable.name).insert(insert).onConflict(joinTable.pivotColumns).transacting(trx);
              if (hasOrderColumn(attribute)) {
                query.merge([orderColumnName]);
              } else {
                query.ignore();
              }
              await query.execute();
            }
            if (isBidirectional(attribute) && isOneToAny(attribute)) {
              await deletePreviousOneToAnyRelations({
                id,
                attribute,
                relIdsToadd: relIdsToaddOrMove,
                db,
                transaction: trx
              });
            }
            if (isAnyToOne(attribute)) {
              await deletePreviousAnyToOneRelations({
                id,
                attribute,
                relIdToadd: relIdsToaddOrMove[0],
                db,
                transaction: trx
              });
            }
          }
        }
      }
    },
    /**
     * Delete relational associations of an existing entity
     * This removes associations but doesn't do cascade deletions for components for example. This will be handled on the entity service layer instead
     * NOTE: Most of the deletion should be handled by ON DELETE CASCADE for dialects that have FKs
     *
     * @param {EntityManager} em - entity manager instance
     * @param {Metadata} metadata - model metadta
     * @param {ID} id - entity ID
     */
    async deleteRelations(uid, id, options) {
      const { attributes } = db.metadata.get(uid);
      const { transaction: trx } = options ?? {};
      for (const attributeName of Object.keys(attributes)) {
        const attribute = attributes[attributeName];
        if (attribute.type !== "relation") {
          continue;
        }
        if (attribute.relation === "morphOne" || attribute.relation === "morphMany") {
          const { target, morphBy } = attribute;
          const targetAttribute = db.metadata.get(target).attributes[morphBy];
          if (targetAttribute.type === "relation" && targetAttribute.relation === "morphToOne") {
            const { idColumn, typeColumn } = targetAttribute.morphColumn;
            await this.createQueryBuilder(target).update({ [idColumn.name]: null, [typeColumn.name]: null }).where({ [idColumn.name]: id, [typeColumn.name]: uid }).transacting(trx).execute();
          } else if (targetAttribute.type === "relation" && targetAttribute.relation === "morphToMany") {
            const { joinTable } = targetAttribute;
            const { morphColumn } = joinTable;
            const { idColumn, typeColumn } = morphColumn;
            await this.createQueryBuilder(joinTable.name).delete().where({
              [idColumn.name]: id,
              [typeColumn.name]: uid,
              ...joinTable.on || {},
              field: attributeName
            }).transacting(trx).execute();
          }
          continue;
        }
        if (attribute.relation === "morphToOne") ;
        if (attribute.relation === "morphToMany") {
          const { joinTable } = attribute;
          const { joinColumn } = joinTable;
          await this.createQueryBuilder(joinTable.name).delete().where({
            [joinColumn.name]: id,
            ...joinTable.on || {}
          }).transacting(trx).execute();
          continue;
        }
        if (db.dialect.usesForeignKeys()) {
          return;
        }
        if ("joinColumn" in attribute && attribute.joinColumn && attribute.owner) {
          continue;
        }
        if ("joinColumn" in attribute && attribute.joinColumn && !attribute.owner) {
          const { target } = attribute;
          await this.createQueryBuilder(target).where({ [attribute.joinColumn.referencedColumn]: id }).update({ [attribute.joinColumn.referencedColumn]: null }).transacting(trx).execute();
        }
        if ("joinTable" in attribute && attribute.joinTable) {
          await deleteRelations({ id, attribute, db, relIdsToDelete: "all", transaction: trx });
        }
      }
    },
    // TODO: add lifecycle events
    async populate(uid, entity, populate) {
      const entry = await this.findOne(uid, {
        select: ["id"],
        where: { id: entity.id },
        populate
      });
      return { ...entity, ...entry };
    },
    // TODO: add lifecycle events
    async load(uid, entity, fields, populate) {
      const { attributes } = db.metadata.get(uid);
      const fieldsArr = castArray(fields);
      fieldsArr.forEach((field) => {
        const attribute = attributes[field];
        if (!attribute || attribute.type !== "relation") {
          throw new Error(`Invalid load. Expected ${field} to be a relational attribute`);
        }
      });
      const entry = await this.findOne(uid, {
        select: ["id"],
        where: { id: entity.id },
        populate: fieldsArr.reduce(
          (acc, field) => {
            acc[field] = populate || true;
            return acc;
          },
          {}
        )
      });
      if (!entry) {
        return null;
      }
      if (Array.isArray(fields)) {
        return pick(fields, entry);
      }
      return entry[fields];
    },
    // cascading
    // aggregations
    // -> avg
    // -> min
    // -> max
    // -> grouping
    // formulas
    // custom queries
    // utilities
    // -> map result
    // -> map input
    // extra features
    // -> virtuals
    // -> private
    createQueryBuilder(uid) {
      return createQueryBuilder(uid, db);
    },
    getRepository(uid) {
      if (!repoMap[uid]) {
        repoMap[uid] = createRepository(uid, db);
      }
      return repoMap[uid];
    }
  };
};
const createStorage = (opts) => {
  const { db, tableName } = opts;
  const hasMigrationTable = () => db.getSchemaConnection().hasTable(tableName);
  const createMigrationTable = () => {
    return db.getSchemaConnection().createTable(tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.datetime("time", { useTz: false });
    });
  };
  return {
    async logMigration({ name }) {
      await db.getConnection().insert({
        name,
        time: /* @__PURE__ */ new Date()
      }).into(tableName);
    },
    async unlogMigration({ name }) {
      await db.getConnection(tableName).del().where({ name });
    },
    async executed() {
      if (!await hasMigrationTable()) {
        await createMigrationTable();
        return [];
      }
      const logs = await db.getConnection(tableName).select().from(tableName).orderBy("time");
      return logs.map((log) => log.name);
    }
  };
};
const wrapTransaction = (db) => (fn) => () => {
  return db.transaction(({ trx }) => Promise.resolve(fn(trx, db)));
};
const transformLogMessage = (level, message) => {
  if (typeof message === "string") {
    return { level, message };
  }
  if (typeof message === "object" && message !== null) {
    if ("event" in message && "name" in message) {
      return {
        level,
        message: `[internal migration]: ${message.event} ${message?.name}`,
        timestamp: Date.now()
      };
    }
  }
  return "";
};
const migrationResolver = ({ name, path: path2, context }) => {
  const { db } = context;
  if (!path2) {
    throw new Error(`Migration ${name} has no path`);
  }
  if (path2.match(/\.sql$/)) {
    const sql = fse.readFileSync(path2, "utf8");
    return {
      name,
      up: wrapTransaction(db)((knex2) => knex2.raw(sql)),
      async down() {
        throw new Error("Down migration is not supported for sql files");
      }
    };
  }
  const migration = require(path2);
  return {
    name,
    up: wrapTransaction(db)(migration.up),
    down: wrapTransaction(db)(migration.down)
  };
};
const createUserMigrationProvider = (db) => {
  const dir = db.config.settings.migrations.dir;
  fse.ensureDirSync(dir);
  const context = { db };
  const umzugProvider = new Umzug({
    storage: createStorage({ db, tableName: "strapi_migrations" }),
    logger: {
      info(message) {
        db.logger.info(transformLogMessage("info", message));
      },
      warn(message) {
        db.logger.warn(transformLogMessage("warn", message));
      },
      error(message) {
        db.logger.error(transformLogMessage("error", message));
      },
      debug(message) {
        db.logger.debug(transformLogMessage("debug", message));
      }
    },
    context,
    migrations: {
      glob: ["*.{js,sql}", { cwd: dir }],
      resolve: migrationResolver
    }
  });
  return {
    async shouldRun() {
      const pendingMigrations = await umzugProvider.pending();
      return pendingMigrations.length > 0 && db.config?.settings?.runMigrations === true;
    },
    async up() {
      await umzugProvider.up();
    },
    async down() {
      await umzugProvider.down();
    }
  };
};
const QUERIES = {
  async postgres(knex2, params) {
    const res = await knex2.raw(
      `
    SELECT :tableName:.id as id, string_agg(DISTINCT :inverseJoinColumn:::character varying, ',') as other_ids
    FROM :tableName:
    LEFT JOIN :joinTableName: ON :tableName:.id = :joinTableName:.:joinColumn:
    WHERE :tableName:.document_id IS NULL
    GROUP BY :tableName:.id, :joinTableName:.:joinColumn:
    LIMIT 1;
  `,
      params
    );
    return res.rows;
  },
  async mysql(knex2, params) {
    const [res] = await knex2.raw(
      `
    SELECT :tableName:.id as id, group_concat(DISTINCT :inverseJoinColumn:) as other_ids
    FROM :tableName:
    LEFT JOIN :joinTableName: ON :tableName:.id = :joinTableName:.:joinColumn:
    WHERE :tableName:.document_id IS NULL
    GROUP BY :tableName:.id, :joinTableName:.:joinColumn:
    LIMIT 1;
  `,
      params
    );
    return res;
  },
  async sqlite(knex2, params) {
    return knex2.raw(
      `
    SELECT :tableName:.id as id, group_concat(DISTINCT :inverseJoinColumn:) as other_ids
    FROM :tableName:
    LEFT JOIN :joinTableName: ON :tableName:.id = :joinTableName:.:joinColumn:
    WHERE :tableName:.document_id IS NULL
    GROUP BY :joinTableName:.:joinColumn:
    LIMIT 1;
    `,
      params
    );
  }
};
const getNextIdsToCreateDocumentId = async (db, knex2, {
  joinColumn,
  inverseJoinColumn,
  tableName,
  joinTableName
}) => {
  const res = await QUERIES[db.dialect.client](knex2, {
    joinColumn,
    inverseJoinColumn,
    tableName,
    joinTableName
  });
  if (res.length > 0) {
    const row = res[0];
    const otherIds = row.other_ids ? row.other_ids.split(",").map((v) => parseInt(v, 10)) : [];
    return [row.id, ...otherIds];
  }
  return [];
};
const migrateDocumentIdsWithLocalizations = async (db, knex2, meta) => {
  const singularName = meta.singularName.toLowerCase();
  const joinColumn = snakeCase(`${singularName}_id`);
  const inverseJoinColumn = snakeCase(`inv_${singularName}_id`);
  let ids;
  do {
    ids = await getNextIdsToCreateDocumentId(db, knex2, {
      joinColumn,
      inverseJoinColumn,
      tableName: meta.tableName,
      joinTableName: snakeCase(`${meta.tableName}_localizations_links`)
    });
    if (ids.length > 0) {
      await knex2(meta.tableName).update({ document_id: createId() }).whereIn("id", ids);
    }
  } while (ids.length > 0);
};
const migrationDocumentIds = async (db, knex2, meta) => {
  let updatedRows;
  do {
    updatedRows = await knex2(meta.tableName).update({ document_id: createId() }).whereIn(
      "id",
      knex2(meta.tableName).select("id").from(knex2(meta.tableName).select("id").whereNull("document_id").limit(1).as("sub_query"))
    );
  } while (updatedRows > 0);
};
const createDocumentIdColumn = async (knex2, tableName) => {
  await knex2.schema.alterTable(tableName, (table) => {
    table.string("document_id");
  });
};
const hasLocalizationsJoinTable = async (knex2, tableName) => {
  const joinTableName = snakeCase(`${tableName}_localizations_links`);
  return knex2.schema.hasTable(joinTableName);
};
const createdDocumentId = {
  name: "5.0.0-02-created-document-id",
  async up(knex2, db) {
    for (const meta of db.metadata.values()) {
      const hasTable = await knex2.schema.hasTable(meta.tableName);
      if (!hasTable) {
        continue;
      }
      if ("documentId" in meta.attributes) {
        const hasDocumentIdColumn = await knex2.schema.hasColumn(meta.tableName, "document_id");
        if (hasDocumentIdColumn) {
          continue;
        }
        await createDocumentIdColumn(knex2, meta.tableName);
        if (await hasLocalizationsJoinTable(knex2, meta.tableName)) {
          await migrateDocumentIdsWithLocalizations(db, knex2, meta);
        } else {
          await migrationDocumentIds(db, knex2, meta);
        }
      }
    }
  },
  async down() {
    throw new Error("not implemented");
  }
};
const debug = createDebug("strapi::database::migration");
const renameIdentifiersLongerThanMaxLength = {
  name: "5.0.0-rename-identifiers-longer-than-max-length",
  async up(knex2, db) {
    const md = db.metadata;
    const diffs = findDiffs(md);
    for (const indexDiff of diffs.indexes) {
      await renameIndex(knex2, db, indexDiff);
    }
    for (const columnDiff of diffs.columns) {
      const { full, short } = columnDiff;
      const tableName = full.tableName;
      const hasTable = await knex2.schema.hasTable(tableName);
      if (hasTable) {
        const hasColumn = await knex2.schema.hasColumn(tableName, full.columnName);
        if (hasColumn) {
          await knex2.schema.alterTable(tableName, async (table) => {
            debug(`renaming column ${full.columnName} to ${short.columnName}`);
            table.renameColumn(full.columnName, short.columnName);
          });
        }
      }
    }
    for (const tableDiff of diffs.tables) {
      const hasTable = await knex2.schema.hasTable(tableDiff.full.tableName);
      if (hasTable) {
        debug(`renaming table ${tableDiff.full.tableName} to ${tableDiff.short.tableName}`);
        await knex2.schema.renameTable(tableDiff.full.tableName, tableDiff.short.tableName);
      }
    }
  },
  async down() {
    throw new Error("not implemented");
  }
};
const renameIndex = async (knex2, db, diff) => {
  const client = db.config.connection.client;
  const short = diff.short;
  const full = diff.full;
  if (full.indexName === short.indexName) {
    debug(`not renaming index ${full.indexName} because name hasn't changed`);
    return;
  }
  if (short.indexName.endsWith("fk") || full.indexName.endsWith("fk")) {
    return;
  }
  debug(`renaming index from ${full.indexName} to ${short.indexName}`);
  try {
    await knex2.transaction(async (trx) => {
      if (client === "mysql" || client === "mariadb") {
        await knex2.raw("ALTER TABLE ?? RENAME INDEX ?? TO ??", [
          full.tableName,
          full.indexName,
          short.indexName
        ]).transacting(trx);
      } else if (client === "pg" || client === "postgres") {
        await knex2.raw("ALTER INDEX ?? RENAME TO ??", [full.indexName, short.indexName]).transacting(trx);
      } else if (["sqlite", "sqlite3", "better-sqlite3"].includes(client)) {
        debug(`SQLite does not support index renaming, not renaming index ${full.indexName}`);
      } else {
        debug(`No db client name matches, not renaming index ${full.indexName}`);
      }
    });
  } catch (err) {
    debug(`error creating index: ${JSON.stringify(err)}`);
  }
};
const findDiffs = (shortMap) => {
  const diffs = {
    tables: [],
    columns: [],
    indexes: []
  };
  const shortArr = Array.from(shortMap.entries());
  shortArr.forEach(([, shortObj], index2) => {
    const fullTableName = identifiers.getUnshortenedName(shortObj.tableName);
    if (!fullTableName) {
      throw new Error(`Missing full table name for ${shortObj.tableName}`);
    }
    if (shortObj.tableName !== fullTableName) {
      diffs.tables.push({
        full: {
          index: index2,
          key: "tableName",
          tableName: fullTableName
        },
        short: {
          index: index2,
          key: "tableName",
          tableName: shortObj.tableName
        }
      });
    }
    for (const attrKey in shortObj.attributes) {
      if (shortObj.attributes[attrKey].type === "relation") {
        continue;
      }
      const attr = shortObj.attributes[attrKey];
      const shortColumnName = attr.columnName;
      const longColumnName = identifiers.getUnshortenedName(shortColumnName);
      if (!shortColumnName || !longColumnName) {
        throw new Error(`missing column name(s) for attribute ${JSON.stringify(attr, null, 2)}`);
      }
      if (shortColumnName && longColumnName && shortColumnName !== longColumnName) {
        diffs.columns.push({
          short: {
            index: index2,
            tableName: fullTableName,
            // NOTE: this means that we must rename columns before tables
            key: `attributes.${attrKey}`,
            columnName: shortColumnName
          },
          full: {
            index: index2,
            tableName: fullTableName,
            key: `attributes.${attrKey}`,
            columnName: longColumnName
          }
        });
      }
    }
    for (const attrKey in shortObj.indexes) {
      const shortIndexName = shortObj.indexes[attrKey].name;
      const longIndexName = identifiers.getUnshortenedName(shortIndexName);
      if (!longIndexName) {
        throw new Error(`Missing full index name for ${shortIndexName}`);
      }
      if (shortIndexName && longIndexName && shortIndexName !== longIndexName) {
        diffs.indexes.push({
          short: {
            index: index2,
            tableName: fullTableName,
            // NOTE: this means that we must rename columns before tables
            key: `indexes.${attrKey}`,
            indexName: shortIndexName
          },
          full: {
            index: index2,
            tableName: fullTableName,
            key: `indexes.${attrKey}`,
            indexName: longIndexName
          }
        });
      }
    }
  });
  return diffs;
};
const createLocaleColumn = async (db, tableName) => {
  await db.schema.alterTable(tableName, (table) => {
    table.string("locale");
  });
};
const createdLocale = {
  name: "5.0.0-03-created-locale",
  async up(knex2, db) {
    for (const meta of db.metadata.values()) {
      const hasTable = await knex2.schema.hasTable(meta.tableName);
      if (!hasTable) {
        continue;
      }
      const uid = meta.uid;
      const model = strapi.getModel(uid);
      if (!model) {
        continue;
      }
      const hasLocaleColumn = await knex2.schema.hasColumn(meta.tableName, "locale");
      if (meta.attributes.locale && !hasLocaleColumn) {
        await createLocaleColumn(knex2, meta.tableName);
      }
    }
  },
  async down() {
    throw new Error("not implemented");
  }
};
const createPublishedAtColumn = async (db, tableName) => {
  await db.schema.alterTable(tableName, (table) => {
    table.string("published_at");
  });
  await db(tableName).update({ published_at: /* @__PURE__ */ new Date() });
};
const createdPublishedAt = {
  name: "5.0.0-04-created-published-at",
  async up(knex2, db) {
    for (const meta of db.metadata.values()) {
      const hasTable = await knex2.schema.hasTable(meta.tableName);
      if (!hasTable) {
        continue;
      }
      const uid = meta.uid;
      const model = strapi.getModel(uid);
      if (!model) {
        continue;
      }
      const hasPublishedAtColumn = await knex2.schema.hasColumn(meta.tableName, "published_at");
      if (meta.attributes.publishedAt && !hasPublishedAtColumn) {
        await createPublishedAtColumn(knex2, meta.tableName);
      }
    }
  },
  async down() {
    throw new Error("not implemented");
  }
};
const dropIndex = async (knex2, tableName, columnName) => {
  try {
    await knex2.schema.alterTable(tableName, (table) => {
      table.dropUnique([columnName], `${tableName}_${columnName}_unique`);
    });
  } catch (error) {
  }
};
const dropSlugFieldsIndex = {
  name: "5.0.0-05-drop-slug-fields-index",
  async up(knex2, db) {
    for (const meta of db.metadata.values()) {
      const hasTable = await knex2.schema.hasTable(meta.tableName);
      if (!hasTable) {
        continue;
      }
      for (const attribute of Object.values(meta.attributes)) {
        if (attribute.type === "uid" && attribute.columnName) {
          await dropIndex(knex2, meta.tableName, attribute.columnName);
        }
      }
    }
  },
  async down() {
    throw new Error("not implemented");
  }
};
const internalMigrations = [
  renameIdentifiersLongerThanMaxLength,
  createdDocumentId,
  createdLocale,
  createdPublishedAt,
  dropSlugFieldsIndex
];
const createInternalMigrationProvider = (db) => {
  const context = { db };
  const migrations = [...internalMigrations];
  const umzugProvider = new Umzug({
    storage: createStorage({ db, tableName: "strapi_migrations_internal" }),
    logger: {
      info(message) {
        db.logger.debug(transformLogMessage("info", message));
      },
      warn(message) {
        db.logger.warn(transformLogMessage("warn", message));
      },
      error(message) {
        db.logger.error(transformLogMessage("error", message));
      },
      debug(message) {
        db.logger.debug(transformLogMessage("debug", message));
      }
    },
    context,
    migrations: () => migrations.map((migration) => {
      return {
        name: migration.name,
        up: wrapTransaction(context.db)(migration.up),
        down: wrapTransaction(context.db)(migration.down)
      };
    })
  });
  return {
    async register(migration) {
      migrations.push(migration);
    },
    async shouldRun() {
      const pendingMigrations = await umzugProvider.pending();
      return pendingMigrations.length > 0;
    },
    async up() {
      await umzugProvider.up();
    },
    async down() {
      await umzugProvider.down();
    }
  };
};
const createMigrationsProvider = (db) => {
  const userProvider = createUserMigrationProvider(db);
  const internalProvider = createInternalMigrationProvider(db);
  const providers = [userProvider, internalProvider];
  return {
    providers: {
      internal: internalProvider
    },
    async shouldRun() {
      const shouldRunResponses = await Promise.all(
        providers.map((provider) => provider.shouldRun())
      );
      return shouldRunResponses.some((shouldRun) => shouldRun);
    },
    async up() {
      for (const provider of providers) {
        if (await provider.shouldRun()) {
          await provider.up();
        }
      }
    },
    async down() {
      for (const provider of providers) {
        if (await provider.shouldRun()) {
          await provider.down();
        }
      }
    }
  };
};
const modelsLifecyclesSubscriber = async (event) => {
  const { model } = event;
  if (model.lifecycles && event.action in model.lifecycles) {
    await model.lifecycles[event.action]?.(event);
  }
};
const timestampsLifecyclesSubscriber = {
  /**
   * Init createdAt & updatedAt before create
   */
  beforeCreate(event) {
    const { data } = event.params;
    const now = /* @__PURE__ */ new Date();
    _$1.defaults(data, { createdAt: now, updatedAt: now });
  },
  /**
   * Init createdAt & updatedAt before create
   * @param {Event} event
   */
  beforeCreateMany(event) {
    const { data } = event.params;
    const now = /* @__PURE__ */ new Date();
    if (_$1.isArray(data)) {
      data.forEach((data2) => _$1.defaults(data2, { createdAt: now, updatedAt: now }));
    }
  },
  /**
   * Update updatedAt before update
   * @param {Event} event
   */
  beforeUpdate(event) {
    const { data } = event.params;
    const now = /* @__PURE__ */ new Date();
    _$1.assign(data, { updatedAt: now });
  },
  /**
   * Update updatedAt before update
   * @param {Event} event
   */
  beforeUpdateMany(event) {
    const { data } = event.params;
    const now = /* @__PURE__ */ new Date();
    if (_$1.isArray(data)) {
      data.forEach((data2) => _$1.assign(data2, { updatedAt: now }));
    }
  }
};
const isValidSubscriber = (subscriber) => {
  return typeof subscriber === "function" || typeof subscriber === "object" && subscriber !== null;
};
const createLifecyclesProvider = (db) => {
  let subscribers = [
    timestampsLifecyclesSubscriber,
    modelsLifecyclesSubscriber
  ];
  return {
    subscribe(subscriber) {
      strict(
        isValidSubscriber(subscriber),
        "Invalid subscriber. Expected function or object"
      );
      subscribers.push(subscriber);
      return () => subscribers.splice(subscribers.indexOf(subscriber), 1);
    },
    clear() {
      subscribers = [];
    },
    createEvent(action, uid, properties, state) {
      const model = db.metadata.get(uid);
      return {
        action,
        model,
        state,
        ...properties
      };
    },
    /**
     * @param {string} action
     * @param {string} uid
     * @param {{ params?: any, result?: any }} properties
     * @param {Map<any, any>} states
     */
    async run(action, uid, properties, states = /* @__PURE__ */ new Map()) {
      for (let i = 0; i < subscribers.length; i += 1) {
        const subscriber = subscribers[i];
        if (typeof subscriber === "function") {
          const state = states.get(subscriber) || {};
          const event = this.createEvent(action, uid, properties, state);
          await subscriber(event);
          if (event.state) {
            states.set(subscriber, event.state || state);
          }
          continue;
        }
        const hasAction = action in subscriber;
        const hasModel = !subscriber.models || subscriber.models.includes(uid);
        if (hasAction && hasModel) {
          const state = states.get(subscriber) || {};
          const event = this.createEvent(action, uid, properties, state);
          await subscriber[action]?.(event);
          if (event.state) {
            states.set(subscriber, event.state);
          }
        }
      }
      return states;
    }
  };
};
const clientMap = {
  sqlite: "better-sqlite3",
  mysql: "mysql2",
  postgres: "pg"
};
function isClientValid(config) {
  return Object.keys(clientMap).includes(config.client);
}
const createConnection = (userConfig, strapiConfig) => {
  if (!isClientValid(userConfig)) {
    throw new Error(`Unsupported database client ${userConfig.client}`);
  }
  const knexConfig = { ...userConfig, client: clientMap[userConfig.client] };
  if (strapiConfig?.pool?.afterCreate) {
    knexConfig.pool = knexConfig.pool || {};
    const userAfterCreate = knexConfig.pool?.afterCreate;
    const strapiAfterCreate = strapiConfig.pool.afterCreate;
    knexConfig.pool.afterCreate = (conn, done) => {
      strapiAfterCreate(conn, (err, nativeConn) => {
        if (err) {
          return done(err, nativeConn);
        }
        if (userAfterCreate) {
          return userAfterCreate(nativeConn, done);
        }
        return done(null, nativeConn);
      });
    };
  }
  return knex(knexConfig);
};
const getLinksWithoutMappedBy = (db) => {
  const relationsToUpdate = {};
  db.metadata.forEach((modelMetadata) => {
    const attributes = modelMetadata.attributes;
    Object.values(attributes).forEach((attribute) => {
      if (attribute.type !== "relation") {
        return;
      }
      if ("inversedBy" in attribute && attribute.inversedBy) {
        const invRelation = db.metadata.get(attribute.target).attributes[attribute.inversedBy];
        if ("inversedBy" in invRelation && invRelation.inversedBy) {
          relationsToUpdate[attribute.joinTable.name] = {
            relation: attribute,
            invRelation
          };
        }
      }
    });
  });
  return Object.values(relationsToUpdate);
};
const isLinkTableEmpty = async (db, linkTableName) => {
  const exists = await db.getSchemaConnection().hasTable(linkTableName);
  if (!exists) return true;
  const result = await db.getConnection().from(linkTableName).count("* as count");
  return Number(result[0].count) === 0;
};
const validateBidirectionalRelations = async (db) => {
  const invalidLinks = getLinksWithoutMappedBy(db);
  for (const { relation, invRelation } of invalidLinks) {
    const modelMetadata = db.metadata.get(invRelation.target);
    const invModelMetadata = db.metadata.get(relation.target);
    const joinTableName = identifiers.getJoinTableName(
      snakeCase(modelMetadata.tableName),
      snakeCase(invRelation.inversedBy)
    );
    const inverseJoinTableName = identifiers.getJoinTableName(
      snakeCase(invModelMetadata.tableName),
      snakeCase(relation.inversedBy)
    );
    const joinTableEmpty = await isLinkTableEmpty(db, joinTableName);
    const inverseJoinTableEmpty = await isLinkTableEmpty(db, inverseJoinTableName);
    if (joinTableEmpty) {
      process.emitWarning(
        `Error on attribute "${invRelation.inversedBy}" in model "${modelMetadata.singularName}" (${modelMetadata.uid}). Please modify your ${modelMetadata.singularName} schema by renaming the key "inversedBy" to "mappedBy". Ex: { "inversedBy": "${relation.inversedBy}" } -> { "mappedBy": "${relation.inversedBy}" }`
      );
    } else if (inverseJoinTableEmpty) {
      process.emitWarning(
        `Error on attribute "${relation.inversedBy}" in model "${invModelMetadata.singularName}" (${invModelMetadata.uid}). Please modify your ${invModelMetadata.singularName} schema by renaming the key "inversedBy" to "mappedBy". Ex: { "inversedBy": "${invRelation.inversedBy}" } -> { "mappedBy": "${invRelation.inversedBy}" }`
      );
    } else ;
  }
};
const validateRelations = async (db) => {
  await validateBidirectionalRelations(db);
};
async function validateDatabase(db) {
  await validateRelations(db);
}
const afterCreate = (db) => (nativeConnection, done) => {
  db.dialect.initialize(nativeConnection).then(() => {
    return done(null, nativeConnection);
  });
};
class Database {
  connection;
  dialect;
  config;
  metadata;
  schema;
  migrations;
  lifecycles;
  entityManager;
  logger;
  constructor(config) {
    this.config = {
      ...config,
      settings: {
        forceMigration: true,
        runMigrations: true,
        ...config.settings ?? {}
      }
    };
    this.logger = config.logger ?? console;
    this.dialect = getDialect(this);
    let knexConfig = this.config.connection;
    if (typeof this.config.connection.connection !== "function") {
      this.dialect.configure();
    } else {
      this.logger.warn(
        "Knex connection functions are currently experimental. Attempting to access the connection object before database initialization will result in errors."
      );
      knexConfig = {
        ...this.config.connection,
        connection: async () => {
          const conn = await this.config.connection.connection();
          this.dialect.configure(conn);
          return conn;
        }
      };
    }
    this.metadata = createMetadata([]);
    this.connection = createConnection(knexConfig, {
      pool: { afterCreate: afterCreate(this) }
    });
    this.schema = createSchemaProvider(this);
    this.migrations = createMigrationsProvider(this);
    this.lifecycles = createLifecyclesProvider(this);
    this.entityManager = createEntityManager(this);
  }
  async init({ models }) {
    if (typeof this.config.connection.connection === "function") {
      this.logger.debug("Forcing Knex to make real connection to db");
      if (this.config.connection.client === "sqlite") {
        await this.connection.raw("SELECT 1");
      } else {
        await this.connection.client.acquireConnection();
      }
    }
    this.metadata.loadModels(models);
    await validateDatabase(this);
    return this;
  }
  query(uid) {
    if (!this.metadata.has(uid)) {
      throw new Error(`Model ${uid} not found`);
    }
    return this.entityManager.getRepository(uid);
  }
  inTransaction() {
    return !!transactionCtx.get();
  }
  async transaction(cb) {
    const notNestedTransaction = !transactionCtx.get();
    const trx = notNestedTransaction ? await this.connection.transaction() : transactionCtx.get();
    async function commit() {
      if (notNestedTransaction) {
        await transactionCtx.commit(trx);
      }
    }
    async function rollback() {
      if (notNestedTransaction) {
        await transactionCtx.rollback(trx);
      }
    }
    if (!cb) {
      return { commit, rollback, get: () => trx };
    }
    return transactionCtx.run(trx, async () => {
      try {
        const callbackParams = {
          trx,
          commit,
          rollback,
          onCommit: transactionCtx.onCommit,
          onRollback: transactionCtx.onRollback
        };
        const res = await cb(callbackParams);
        await commit();
        return res;
      } catch (error) {
        await rollback();
        throw error;
      }
    });
  }
  getSchemaName() {
    return this.connection.client.connectionSettings.schema;
  }
  getConnection(tableName) {
    const schema = this.getSchemaName();
    const connection = tableName ? this.connection(tableName) : this.connection;
    return schema ? connection.withSchema(schema) : connection;
  }
  // Returns basic info about the database connection
  getInfo() {
    const connectionSettings = this.connection?.client?.connectionSettings || {};
    const client = this.dialect?.client || "";
    let displayName = "";
    let schema;
    if (client === "sqlite") {
      const absolutePath = connectionSettings?.filename;
      if (absolutePath) {
        displayName = path$1.relative(process.cwd(), absolutePath);
      }
    } else {
      displayName = connectionSettings?.database;
      schema = connectionSettings?.schema;
    }
    return {
      displayName,
      schema,
      client
    };
  }
  getSchemaConnection(trx = this.connection) {
    const schema = this.getSchemaName();
    return schema ? trx.schema.withSchema(schema) : trx.schema;
  }
  queryBuilder(uid) {
    return this.entityManager.createQueryBuilder(uid);
  }
  async destroy() {
    await this.lifecycles.clear();
    await this.connection.destroy();
  }
}
export {
  Database,
  index as errors,
  isKnexQuery
};
//# sourceMappingURL=index.mjs.map
