import { pgTable, integer, varchar, text, boolean, timestamp, foreignKey, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const buildFans = pgTable("build_fans", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    buildId: integer("build_id").notNull(),
    fanId: integer("fan_id").notNull(),
    quantity: integer().default(1),
}, (table) => [
    foreignKey({
        columns: [table.buildId],
        foreignColumns: [builds.id],
        name: "build_fans_build_id_fkey"
    }),
    foreignKey({
        columns: [table.fanId],
        foreignColumns: [fan.id],
        name: "build_fans_fan_id_fkey"
    }),
]);

export const buildRams = pgTable("build_rams", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    buildId: integer("build_id").notNull(),
    ramId: integer("ram_id").notNull(),
    quantity: integer().default(1),
}, (table) => [
    foreignKey({
        columns: [table.buildId],
        foreignColumns: [builds.id],
        name: "build_rams_build_id_fkey"
    }),
    foreignKey({
        columns: [table.ramId],
        foreignColumns: [ram.id],
        name: "build_rams_ram_id_fkey"
    }),
]);

export const buildStorages = pgTable("build_storages", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    buildId: integer("build_id").notNull(),
    storageId: integer("storage_id").notNull(),
    quantity: integer().default(1),
}, (table) => [
    foreignKey({
        columns: [table.buildId],
        foreignColumns: [builds.id],
        name: "build_storages_build_id_fkey"
    }),
    foreignKey({
        columns: [table.storageId],
        foreignColumns: [storage.id],
        name: "build_storages_storage_id_fkey"
    }),
]);

export const builds = pgTable("builds", {
        id: integer().primaryKey().generatedByDefaultAsIdentity(),
        userId: integer("user_id").notNull(),
        title: varchar().notNull(),
        description: text(),
        isPublic: boolean("is_public").default(true),
        deleted: boolean().default(false),
        moboId: integer("mobo_id"),
        cpuId: integer("cpu_id"),
        gpuId: integer("gpu_id"),
        cpuCoolerId: integer("cpu_cooler_id"),
        caseId: integer("case_id"),
        psuId: integer("psu_id"),
        createdAt: timestamp("created_at").default(sql`now()`),
        updatedAt: timestamp("updated_at").default(sql`now()`),
    }, (table) => [
        foreignKey({
            columns: [table.caseId],
            foreignColumns: [pcCase.id],
    name: "builds_case_id_fkey"
}),
foreignKey({
    columns: [table.cpuCoolerId],
    foreignColumns: [cpuCooler.id],
    name: "builds_cpu_cooler_id_fkey"
}),
    foreignKey({
        columns: [table.cpuId],
        foreignColumns: [cpu.id],
        name: "builds_cpu_id_fkey"
    }),
    foreignKey({
        columns: [table.gpuId],
        foreignColumns: [gpu.id],
        name: "builds_gpu_id_fkey"
    }),
    foreignKey({
        columns: [table.moboId],
        foreignColumns: [mobo.id],
        name: "builds_mobo_id_fkey"
    }),
    foreignKey({
        columns: [table.psuId],
        foreignColumns: [psu.id],
        name: "builds_psu_id_fkey"
    }),
    foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "builds_user_id_fkey"
    }),
]);

export const pcCase = pgTable("case", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    formFactor: varchar("form_factor").notNull(),
    maxGpuLengthMm: integer("max_gpu_length_mm").notNull(),
    maxCoolerHeightMm: integer("max_cooler_height_mm").notNull(),
    maxAioRadiatorMm: integer("max_aio_radiator_mm"),
    hasTemperedGlass: boolean("has_tempered_glass").default(true),
    deleted: boolean().default(false),
});

export const comments = pgTable("comments", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    postId: integer("post_id").notNull(),
    userId: integer("user_id").notNull(),
    content: text().notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
    deleted: boolean().default(false),
}, (table) => [
    foreignKey({
        columns: [table.postId],
        foreignColumns: [posts.id],
        name: "comments_post_id_fkey"
    }),
    foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "comments_user_id_fkey"
    }),
]);

export const cpu = pgTable("cpu", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    family: varchar().notNull(),
    architecture: varchar().notNull(),
    series: varchar().notNull(),
    socket: varchar().notNull(),
    tdpWatts: integer("tdp_watts").notNull(),
    coreCount: integer("core_count"),
    threadCount: integer("thread_count"),
    integratedGraphics: boolean("integrated_graphics").default(false),
    deleted: boolean().default(false),
});

export const cpuCooler = pgTable("cpu_cooler", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    fanCount: integer("fan_count"),
    supportedSockets: varchar("supported_sockets").notNull(),
    type: varchar().notNull(),
    heightMm: integer("height_mm"),
    radiatorSizeMm: integer("radiator_size_mm"),
    deleted: boolean().default(false),
});

export const fan = pgTable("fan", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    sizeMm: integer("size_mm").notNull(),
    isRgb: boolean("is_rgb").default(false),
    deleted: boolean().default(false),
});

export const gpu = pgTable("gpu", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    pcieVersion: integer("pcie_version"),
    manufacturer: varchar().notNull(),
    family: varchar().notNull(),
    architecture: varchar().notNull(),
    series: varchar().notNull(),
    lengthMm: integer("length_mm").notNull(),
    tdpWatts: integer("tdp_watts").notNull(),
    powerConnectorType: varchar("power_connector_type"),
    powerConnectorAmount: integer("power_connector_amount"),
    deleted: boolean().default(false),
});

export const mobo = pgTable("mobo", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    socket: varchar().notNull(),
    formFactor: varchar("form_factor").notNull(),
    ddrGeneration: integer("ddr_generation").notNull(),
    ramSlots: integer("ram_slots").notNull(),
    maxRamSpeedMhz: integer("max_ram_speed_mhz"),
    pcieVersion: integer("pcie_version"),
    m2SlotsCount: integer("m2_slots_count").default(1),
    sataPortsCount: integer("sata_ports_count").default(4),
    deleted: boolean().default(false),
});

export const posts = pgTable("posts", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: integer("user_id").notNull(),
    buildId: integer("build_id"),
    title: varchar().notNull(),
    content: text().notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
    updatedAt: timestamp("updated_at").default(sql`now()`),
    deleted: boolean().default(false),
}, (table) => [
    foreignKey({
        columns: [table.buildId],
        foreignColumns: [builds.id],
        name: "posts_build_id_fkey"
    }),
    foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "posts_user_id_fkey"
    }),
]);

export const psu = pgTable("psu", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    wattage: integer().notNull(),
    efficiencyRating: varchar("efficiency_rating"),
    modularity: varchar(),
    pcie6plus2Connectors: integer("pcie_6plus2_connectors"),
    "12vhpwrConnectors": integer("12vhpwr_connectors"),
    deleted: boolean().default(false),
});

export const ram = pgTable("ram", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    ddrGeneration: integer("ddr_generation").notNull(),
    moduleCapacityGb: integer("module_capacity_gb").notNull(),
    moduleCount: integer("module_count").notNull(),
    speedMhz: integer("speed_mhz").notNull(),
    casLatency: integer("cas_latency"),
    deleted: boolean().default(false),
});

export const storage = pgTable("storage", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    name: varchar().notNull(),
    newPrice: integer("new_price"),
    usedPrice: integer("used_price"),
    manufacturer: varchar().notNull(),
    formFactor: varchar("form_factor").notNull(),
    interfaceType: varchar("interface_type").notNull(),
    capacityGb: integer("capacity_gb").notNull(),
    type: varchar().notNull(),
    deleted: boolean().default(false),
});

export const users = pgTable("users", {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    username: varchar().notNull(),
    email: varchar().notNull(),
    passwordHash: varchar("password_hash").notNull(),
    role: varchar().default("user"),
    createdAt: timestamp("created_at").default(sql`now()`),
    deleted: boolean().default(false),
}, (table) => [
    unique("users_email_key").on(table.email),	unique("users_username_key").on(table.username),]);
