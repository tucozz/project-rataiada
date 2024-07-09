import Dexie, { type EntityTable } from 'dexie';
import 'dexie-observable';
import 'dexie-syncable';

interface Character {
	id: string;
	identity_name: string;
	identity_background: string;
	identity_birthsign: string;
	identity_coat: string;
	identity_look: string;
	stats_level: number;
	stats_experience: number;
	stats_gritpoints: number;
	stats_strength_curr: number;
	stats_strength_max: number;
	stats_dexterity_curr: number;
	stats_dexterity_max: number;
	stats_willpower_curr: number;
	stats_willpower_max: number;
	stats_healthpoints_curr: number;
	stats_healthpoints_max: number;
	inventory_pips: number;
	bank_pips: number;
}

const db = new Dexie('RataiadaDatabase') as Dexie & {
	characters: EntityTable<
		Character,
		'id' // primary key "id" (for the typings only)
	>;
};

// Schema declaration:
db.version(1).stores({
	characters:
		'$$id, identity_name, identity_background, identity_birthsign, identity_coat, identity_look, stats_level, stats_experience, stats_gritpoints, stats_strength_curr, stats_strength_max, stats_dexterity_curr, stats_dexterity_max, stats_willpower_curr, stats_willpower_max, stats_healthpoints_curr, stats_healthpoints_max, inventory_pips, bank_pips' // primary key "id" (for the runtime!)
});

// Add another version, just to trigger an upgrade for Dexie.Syncable
db.version(2).stores({}); // No need to add / remove tables. This is just to allow the addon to install its tables.

export type { Character };
export { db };
