import  { ChangeEventHandler, ComponentProps, useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

type Props = ComponentProps<"input"> & {
    progress?: number
}

export function ImageInput({ defaultValue, className, progress, ...props }: Props) {
    const [hover, setHover] = useState<boolean>(false);
    const [preview, setPreview] = useState(defaultValue?.toString() ?? null);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setHover(false)
        const target = event.target
        if (target.files && target.files.length > 0) {
            const file = target.files[0]
            setPreview(URL.createObjectURL(file));
        }
    }

    return <div
        className={cn(className, 'group grid place-items-center relative bg-muted hover:text-primary hover:ring-2 hover:ring-primary hover:border-dashed' +
        ' hover:bg-primary/10' +
        ' transition-all' +
        ' rounded-lg', props['aria-invalid'] && 'ring-destructive ring-2 bg-destructive/20', hover && 'border-dashed bg-primary/10 text-primary ring-2' +
            ' ring-primary')}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <input
            type="file"
            {...props}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onDragOver={() => setHover(true)}
            onDragLeave={() => setHover(false)}
            onDragEnd={() => setHover(false)}
            onChange={handleChange}
        />
        <Upload size={16} />
        {preview && <img
            className={cn("absolute inset-0 object-cover size-full transition-all overflow-hidden rounded-lg", hover || props['aria-invalid'] && "opacity-20")}
            src={preview}
            alt=""
        />}
        {progress && <div
            className="h-2 rounded-b-lg opacity-80 absolute bottom-0 left-0 pointer-none origin-left w-full bg-primary"
            style={{transform: `scaleX(${progress.toFixed(2)}`}}
        >
        </div>}
    </div>
}
