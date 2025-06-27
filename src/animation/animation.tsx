export const notificationVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 1,
        transition: {duration: 0.2, ease: 'easeOut'}
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {duration: 0.25, ease: 'easeOut'}
    },
    exit: {
        opacity: 0,
        y: 20,
        scale: 1,
        transition: {duration: 0.25, ease: 'easeIn'}
    }
};