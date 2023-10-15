import { motion } from "framer-motion";

interface NoteCardSkeletonProps {
  index: number;
}

const NoteCardSkeleton = (props: NoteCardSkeletonProps) => {
  const { index } = props;

  return (
    <motion.div
      animate={{ opacity: [0.5, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      key={index}
      // style={{ opacity: 1 - index / 14 }}
      className='relative max-h-44 min-h-44 flex flex-col justify-evenly border-[1px] border-stone-700 rounded-md bg-neutral-800/40 p-5 transition-all z-10'
    >
      <h3 className='font-bold text-2xl'>
        <div className='w-28 h-5 bg-neutral-600 rounded-sm' />
      </h3>
      <p className='text-xs text-neutral-500 font-semibold pt-1'>
        <div className='w-20 h-3 bg-neutral-600 rounded-sm' />
      </p>
      <p className='pt-3 line-clamp-2 text-neutral-500'>
        <div className='flex flex-col gap-2'>
          <div className='w-48 h-3 bg-neutral-600 rounded-sm' />
          <div className='w-36 h-3 bg-neutral-600 rounded-sm' />
          <div className='w-40 h-3 bg-neutral-600 rounded-sm' />
        </div>
      </p>
    </motion.div>
  );
};

export default NoteCardSkeleton;
