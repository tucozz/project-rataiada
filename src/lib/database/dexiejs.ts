import Dexie, { type EntityTable } from 'dexie';
import type { Character, CharacterItem, Item } from './schemas';

const db = new Dexie('RataiadaDatabase') as Dexie & {
	characters: EntityTable<
		Character,
		'id' // primary key "id" (for the typings only)
	>;
	items: EntityTable<Item, 'id'>;
	characterItems: EntityTable<CharacterItem, 'id'>;
};

// Schema declaration:
db.version(1).stores({
	characters:
		'id,*inventory_items_main_body,*inventory_items_pack,*bank_items,*grit_ignored_conditions_items',
	items: 'id',
	characterItems: 'id,characterId'
});

export { db };
