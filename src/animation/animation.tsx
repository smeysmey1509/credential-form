export const notificationVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        // scale: 1,
        transition: {duration: 0.2, ease: 'easeOut'}
    },
    visible: {
        opacity: 1,
        y: -2,
        // scale: 1,
        transition: {duration: 0.25, ease: 'easeOut'}
    },
    exit: {
        opacity: 0,
        y: 20,
        // scale: 1,
        transition: {duration: 0.25, ease: 'easeIn'}
    }
};

export const toolbarVariants = {
    hidden: {
        opacity: 0,
        y: 50, // start below the screen
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 0.2,
            ease: 'easeIn',
        },
    },
};

export const dropdownVariants = {
    hidden: {
        opacity: 0,
        y: 8,
        scale: 0.98,
        transition: {duration: 0.2, ease: 'easeOut'},
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {duration: 0.25, ease: 'easeOut'},
    },
    exit: {
        opacity: 0,
        y: 8,
        scale: 0.98,
        transition: {duration: 0.15, ease: 'easeIn'},
    },
};