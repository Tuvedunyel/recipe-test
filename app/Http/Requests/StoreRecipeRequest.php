<?php

namespace App\Http\Requests;

use App\Models\Enum\RecipeLevel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3'],
            'persons' => ['required', 'integer', 'min:1'],
            'duration' => ['required', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'level' => ['required', Rule::enum(RecipeLevel::class)],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ];
    }
}
