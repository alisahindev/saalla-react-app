import Rollbar from 'rollbar';

export const RollbarErrorTracking = (() => {

    const RollbarObj = new Rollbar({
        accessToken: "e8c05952383149e6ab6e77ae07b641c6",
        captureUncaught: true,
        captureUnhandledRejections: true,
    });

    const logErroInfo = (info) => {
        RollbarObj.info(info);
    };

    const logErrorInRollbar = (error) => {
        throw new Error(error);
    };
    return { logErroInfo, logErrorInRollbar };
})();

export default RollbarErrorTracking;