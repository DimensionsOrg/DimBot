'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220911184748 extends Migration {

  async up() {
    this.addSql('create table `birthday` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `birthday` datetime not null, primary key (`id`));');

    this.addSql('create table `data` (`key` text not null, `created_at` datetime not null, `updated_at` datetime not null, `value` text not null, primary key (`key`));');

    this.addSql('create table `guild` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `prefix` text null, `deleted` integer not null, `last_interact` datetime not null, primary key (`id`));');

    this.addSql('create table `image` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `file_name` text not null, `url` text not null, `hash` text not null, `delete_hash` text not null, `size` integer not null);');

    this.addSql('create table `pastebin` (`id` text not null, `edit_code` text not null, `lifetime` integer not null, `created_at` datetime not null, primary key (`id`));');

    this.addSql('create table `stat` (`id` integer not null primary key autoincrement, `type` text not null, `value` text not null, `additional_data` json null, `created_at` datetime not null);');

    this.addSql('create table `user` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `last_interact` datetime not null, primary key (`id`));');
  }

}
exports.Migration20220911184748 = Migration20220911184748;
