import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .createTable('users', function(table) {
            table.increments('id').primary();
            table.string('nome', 100).notNullable();
            table.string('email', 100).notNullable();
            table.string('password', 255).notNullable();
            table.enum('role', ['user', 'admin']).notNullable().defaultTo('user');
            table.boolean('is_active').notNullable().defaultTo(true);
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now(6));
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now(6));
        })
        .createTable('movies', function(table) {
            table.increments('id').primary();
            table.integer('created_by').unsigned();
            table.string('title', 255).notNullable();
            table.string('director', 100);
            table.string('genre', 100);
            table.timestamp('release');
            table.text('synopsis');
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now(6));
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now(6));
            table.foreign('created_by').references("users.id");
        })
        .createTable('movie_cast', function(table) {
            table.increments('id').primary();
            table.integer('movie_id').unsigned();
            table.string('actor_name', 100).notNullable();
            table.string('role', 100).notNullable();
            table.foreign('movie_id').references("movies.id");
        })
        .createTable('votes', function(table) {
            table.increments('id').primary();
            table.integer('user_id').unsigned();
            table.integer('movie_id').unsigned();
            table.tinyint('vote').notNullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now(6));
            table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now(6));
            table.foreign('user_id').references("users.id");
            table.foreign('movie_id').references("movies.id");
        })
        .createTable('tokens', function(table) {
            table.increments('id').primary();
            table.integer('user_id').unsigned();
            table.string('token', 255).notNullable();
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now(6));
            table.timestamp('expires_at').notNullable().defaultTo(knex.fn.now(6));
            table.foreign('user_id').references("users.id");
        });

    await knex('users').insert([
        { nome: 'admin', email: 'admin@example.com', password: '$2b$10$A/GrVuASd6TyFu8RpSO/ludPkxVUMF0Syxoqk.OlpIWBYeGICJEyy', role: 'admin', is_active: true }
    ]);

    return;
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('votes')
        .dropTable('tokens')
        .dropTable('movies_cast')
        .dropTable('movies')
        .dropTable('users');
}

