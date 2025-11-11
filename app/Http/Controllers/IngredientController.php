<?php

namespace App\Http\Controllers;

use App\Http\Resources\IngredientResource;
use App\Models\Enum\IngredientUnit;
use App\Models\Ingredient;
use App\Http\Requests\FormIngredientRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Ingredient::query()->orderFromRequest($request);
        $search = $request->get('q');

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        return Inertia::render('ingredients/index', [
            'q' => $search,
            'collection' => IngredientResource::collection($query->paginate(10)->withQueryString()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormIngredientRequest $request)
    {
        $ingredient = Ingredient::create($request->validated());
        $this->handleFormRequest($ingredient, $request);
        return to_route('ingredients.index')->with('success', "L'ingrédient a bien été créé");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ingredient = new Ingredient([
            'unit' => IngredientUnit::None
        ]);
        return $this->edit($ingredient);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ingredient $ingredient)
    {
        return Inertia::render('ingredients/form', [
            'ingredient' => new IngredientResource($ingredient),
            'units' => IngredientUnit::getOptions()
        ]);
    }

    private function handleFormRequest(Ingredient $ingredient, FormIngredientRequest $request)
    {
        $image = $request->validated('image');
        if ($image && $image instanceof UploadedFile) {
            $ingredient->addMediaFromRequest('image')->toMediaCollection('image');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ingredient $ingredient)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormIngredientRequest $request, Ingredient $ingredient)
    {
        $ingredient->update($request->validated());
        $this->handleFormRequest($ingredient, $request);
        return to_route('ingredients.index')->with('success', "L'ingrédient a été modifié.");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ingredient $ingredient)
    {
//        $ingredient->delete();
        return to_route('ingredients.index')->with('success', "L'ingrédient a été supprimé.");
    }

}
