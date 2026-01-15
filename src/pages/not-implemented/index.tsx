type NotImplementedPageProps = {
  title?: string;
  description?: string;
};

export default function NotImplementedPage({
  title = 'Under construction',
  description = 'This page is not yet implemented. Please check back later.',
}: NotImplementedPageProps) {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-lg font-semibold text-gray-600'>
        {title}
      </h1>

      <p className='mt-2 max-w-md text-sm text-gray-400'>
        {description}
      </p>
    </div>
  );
}
