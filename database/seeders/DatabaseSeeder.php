<?php

namespace Database\Seeders;

use App\Models\Enum\IngredientUnit;
use App\Models\Ingredient;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'gmontoya@fleuttoya.studio'],
            [
                'name' => 'Test User',
                'password' => Hash::make('user!Tribu1'),
                'email_verified_at' => now(),
            ]
        );

        $ingredients = [
            ['name' => 'Beurre doux', 'unit' => IngredientUnit::Grams],
            ['name' => 'Farine de blé', 'unit' => IngredientUnit::Grams],
            ['name' => 'Oeufs', 'unit' => IngredientUnit::None],
            ['name' => 'Lait entier', 'unit' => IngredientUnit::Ml],
            ['name' => 'Fromage rapé Emmental', 'unit' => IngredientUnit::Grams],
            ['name' => 'Tomates cerises', 'unit' => IngredientUnit::Grams],
            ['name' => 'Ail', 'unit' => IngredientUnit::None],
            ['name' => 'Huile d\'olive extra vierge', 'unit' => IngredientUnit::Ml],
            ['name' => 'Sel de Guérande', 'unit' => IngredientUnit::Teaspoon],
            ['name' => 'Poivre noir moulu', 'unit' => IngredientUnit::Teaspoon],
            ['name' => 'Jambon de Bayonne', 'unit' => IngredientUnit::Slice],
            ['name' => 'Crème fraîche épaisse', 'unit' => IngredientUnit::Ml],
            ['name' => 'Champignons de Paris', 'unit' => IngredientUnit::Grams],
            ['name' => 'Basilic frais', 'unit' => IngredientUnit::None],
            ['name' => 'Persil plat', 'unit' => IngredientUnit::None],
            ['name' => 'Carottes', 'unit' => IngredientUnit::None],
            ['name' => 'Courgettes', 'unit' => IngredientUnit::None],
            ['name' => 'Thym frais', 'unit' => IngredientUnit::Teaspoon],
            ['name' => 'Moutarde de Dijon', 'unit' => IngredientUnit::Tablespoon],
        ];

        Ingredient::factory()->createMany($ingredients);
    }
}
