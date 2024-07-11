interface PocoCharacter {
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

interface Character extends PocoCharacter {
	inventory_items_main_body: string[];
	inventory_items_pack: string[];
	bank_items: string[];
	grit_ignored_conditions_items: string[];
}

interface Item {
	id: string;
	name?: string;
	dmgOrDef?: string;
	mechanicDescription?: string;
	clearDescription?: string;
	class?: string;
	usagesTotal?: number;
	hasStar: boolean;
	imageBase64?: string;
	width: number;
	height: number;
	backgroundColor: string;
	foregroundColor: string;
	divider: boolean;
	border: boolean;
}

interface CharacterItem extends Item {
	characterId: string;
	usages: number;
	gridPositionTop: number;
	gridPositionLeft: number;
}

export type { PocoCharacter, Character, Item, CharacterItem };
