<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRecipeRequest;
use App\Http\Requests\UpdateRecipeRequest;
use App\Http\Resources\RecipeResource;
use App\Models\Enum\RecipeLevel;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Recipe::query()->with('media')->orderFromRequest($request);
        $search = $request->get('q');

        if ($search) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        return Inertia::render('recipes/index', [
            'q' => $search,
            'collection' => RecipeResource::collection(
                $query->paginate(10)
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $recipe = new Recipe([
            'level' => RecipeLevel::EASY,
            'persons' => 4,
            'duration' => 30,
        ]);

        return $this->edit($recipe);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRecipeRequest $request)
    {
        $recipe = Recipe::create($request->validated());
        $this->handleFormRequest($recipe, $request);

        return to_route('recipes.index')->with('success', 'La recette a bien été créée');
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        return Inertia::render('recipes/form', [
            'recipe' => new RecipeResource($recipe),
            'levels' => fn () => RecipeLevel::getOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRecipeRequest $request, Recipe $recipe)
    {
        $recipe->update($request->validated());
        $this->handleFormRequest($recipe, $request);

        return to_route('recipes.index')->with('success', 'La recette a bien été mise à jour');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return to_route('recipes.index')->with('success', 'La recette a bien été supprimée');
    }

    private function handleFormRequest(Recipe $recipe, StoreRecipeRequest $request)
    {
        $image = $request->validated('image');
        if ($image instanceof UploadedFile) {
            $recipe->addMedia($image)->toMediaCollection('image');
        }
    }
}
