<?php

namespace App\Models;

use App\Models\Traits\HasSortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Recipe extends Model implements HasMedia
{
    use HasFactory;
    use HasSortable;
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'persons',
        'duration',
        'description',
        'level',
    ];

    protected $sortable = [
        'name',
        'persons',
        'duration',
        'level',
    ];

    protected $casts = [
        'level' => RecepeLevel::class,
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaCollection('thumb')->fit(Fit::Crop, 160, 160);
    }
}
