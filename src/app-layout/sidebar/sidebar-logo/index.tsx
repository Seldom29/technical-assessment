type SidebarLogoProps = {
    src: string;
    alt?: string;
};

export default function SidebarLogo({
    src,
    alt = 'Logo',
}: SidebarLogoProps) {

    return (
        <div className='flex h-12 items-center justify-center'>
            <img
                src={src}
                alt={alt}
            />
        </div>
    );
}
