import CaseCreator from "./cases/caseCreator";
import {loadingApiCases} from "./cases/loadingApiCases";
import ConverterChain from "./converters/converterChain";
import {snakeCaseToCamelCaseConverter} from "./converters/snakeCaseToCamelCaseConverter";
import {sortByIdConverter} from "./converters/sortByIdConverter";
import {defaultLoader} from "./loaders/defaultLoader";
import {getNewLoader} from "./loaders/getNewLoader";
import {
    getDeleter,
    getOptionalLoader,
    getPublisher, getResourceInteraction,
    getSimpleLoader,
    getStubLoader,
    getUpdater
} from "./loaders/requester";
import {stubLoader} from "./loaders/stubLoader";
import CustomSlice from "./slice-manager/customSlice";
import {getTtlPersistTransform} from "./slice-manager/getTtlPersistTransform";
import PersistSlice from "./slice-manager/persistSlice";
import PersistSliceManager from "./slice-manager/persistSliceManager";
import SliceManager from "./slice-manager/sliceManager";


const sliceManagement = {
    CaseCreator: CaseCreator,
    loadingApiCases: loadingApiCases,
    ConverterChain: ConverterChain,
    snakeCaseToCamelCaseConverter: snakeCaseToCamelCaseConverter,
    sortByIdConverter: sortByIdConverter,
    defaultLoader: defaultLoader,
    getNewLoader: getNewLoader,
    getStubLoader: getStubLoader,
    getSimpleLoader: getSimpleLoader,
    getOptionalLoader: getOptionalLoader,
    getUpdater: getUpdater,
    getPublisher: getPublisher,
    getDeleter: getDeleter,
    getResourceInteraction: getResourceInteraction,
    stubLoader: stubLoader,
    CustomSlice: CustomSlice,
    getTtlPersistTransform: getTtlPersistTransform,
    PersistSlice: PersistSlice,
    PersistSliceManager: PersistSliceManager,
    SliceManager: SliceManager,
};

export default sliceManagement;