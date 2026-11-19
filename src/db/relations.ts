import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	builds: {
		fans: r.many.fan({
			from: r.builds.id.through(r.buildFans.buildId),
			to: r.fan.id.through(r.buildFans.fanId)
		}),
		buildFans: r.many.buildFans(),
		rams: r.many.ram({
			from: r.builds.id.through(r.buildRams.buildId),
			to: r.ram.id.through(r.buildRams.ramId)
		}),
		buildRams: r.many.buildRams(),
		storages: r.many.storage({
			from: r.builds.id.through(r.buildStorages.buildId),
			to: r.storage.id.through(r.buildStorages.storageId)
		}),
		buildStorages: r.many.buildStorages(),
		case: r.one.pcCase({
			from: r.builds.caseId,
			to: r.pcCase.id
		}),
		cpuCooler: r.one.cpuCooler({
			from: r.builds.cpuCoolerId,
			to: r.cpuCooler.id
		}),
		cpu: r.one.cpu({
			from: r.builds.cpuId,
			to: r.cpu.id
		}),
		gpu: r.one.gpu({
			from: r.builds.gpuId,
			to: r.gpu.id
		}),
		mobo: r.one.mobo({
			from: r.builds.moboId,
			to: r.mobo.id
		}),
		psu: r.one.psu({
			from: r.builds.psuId,
			to: r.psu.id
		}),
		user: r.one.users({
			from: r.builds.userId,
			to: r.users.id,
			alias: "builds_userId_users_id"
		}),
		users: r.many.users({
			from: r.builds.id.through(r.posts.buildId),
			to: r.users.id.through(r.posts.userId),
			alias: "builds_id_users_id_via_posts"
		}),
		posts: r.many.posts(),
	},
	fan: {
		builds: r.many.builds(),
		buildFans: r.many.buildFans(),
	},
	buildFans: {
		build: r.one.builds({
			from: r.buildFans.buildId,
			to: r.builds.id
		}),
		fan: r.one.fan({
			from: r.buildFans.fanId,
			to: r.fan.id
		}),
	},
	ram: {
		builds: r.many.builds(),
		buildRams: r.many.buildRams(),
	},
	buildRams: {
		build: r.one.builds({
			from: r.buildRams.buildId,
			to: r.builds.id
		}),
		ram: r.one.ram({
			from: r.buildRams.ramId,
			to: r.ram.id
		}),
	},
	storage: {
		builds: r.many.builds(),
		buildStorages: r.many.buildStorages(),
	},
	buildStorages: {
		build: r.one.builds({
			from: r.buildStorages.buildId,
			to: r.builds.id
		}),
		storage: r.one.storage({
			from: r.buildStorages.storageId,
			to: r.storage.id
		}),
	},
	case: {
		builds: r.many.builds(),
	},
	cpuCooler: {
		builds: r.many.builds(),
	},
	cpu: {
		builds: r.many.builds(),
	},
	gpu: {
		builds: r.many.builds(),
	},
	mobo: {
		builds: r.many.builds(),
	},
	psu: {
		builds: r.many.builds(),
	},
	users: {
		buildsUserId: r.many.builds({
			alias: "builds_userId_users_id"
		}),
		postsViaComments: r.many.posts({
			alias: "posts_id_users_id_via_comments"
		}),
		comments: r.many.comments(),
		buildsViaPosts: r.many.builds({
			alias: "builds_id_users_id_via_posts"
		}),
		postsUserId: r.many.posts({
			alias: "posts_userId_users_id"
		}),
	},
	posts: {
		users: r.many.users({
			from: r.posts.id.through(r.comments.postId),
			to: r.users.id.through(r.comments.userId),
			alias: "posts_id_users_id_via_comments"
		}),
		comments: r.many.comments(),
		build: r.one.builds({
			from: r.posts.buildId,
			to: r.builds.id
		}),
		user: r.one.users({
			from: r.posts.userId,
			to: r.users.id,
			alias: "posts_userId_users_id"
		}),
	},
	comments: {
		post: r.one.posts({
			from: r.comments.postId,
			to: r.posts.id
		}),
		user: r.one.users({
			from: r.comments.userId,
			to: r.users.id
		}),
	},
}))