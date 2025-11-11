<?php

namespace App\Models\Enum;

enum IngredientUnit: string
{
    case Grams = 'g';
    case Kilograms = 'kg';
    case Slice = 'slice';
    case Ml = 'ml';
    case Tablespoon = 'tbsp';
    case Teaspoon = 'tsp';
    case None = 'none';

    public static function getOptions(): array
    {
        return array_map(fn (self $unit) => [
            'label' => $unit->label() ?: 'Aucune quantité',
            'value' => $unit->value,
        ], self::cases());
    }

    public function label(): string
    {
        return match ($this) {
            self::Grams => 'g',
            self::Kilograms => 'kg',
            self::Slice => 'Tranche',
            self::Ml => 'ml',
            self::Tablespoon => 'Guillère à soupe',
            self::Teaspoon => 'Guillère à café',
            self::None => '',
        };
    }
}
