import Dexie, { type EntityTable } from 'dexie';

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

interface TextItem {
	id: string;
	character_id: string;
	place: 'inventory_main_body' | 'inventory_pack' | 'bank' | 'grit';
	content: string;
}

const db = new Dexie('RataiadaDatabase') as Dexie & {
	characters: EntityTable<
		Character,
		'id' // primary key "id" (for the typings only)
	>;
	textItems: EntityTable<
		TextItem,
		'id' // primary key "id" (for the typings only)
	>;
};

// Schema declaration:
db.version(1).stores({
	characters: 'id',
	textItems: 'id, character_id, place'
});

export { db, type Character, type TextItem };
