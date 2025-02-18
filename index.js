import CaseCreator from './lib/cases/CaseCreator';
import {loadingApiCases} from './lib/cases/loadingApiCases';
import ConverterChain from './lib/converters/ConverterChain';
import {snakeCaseToCamelCaseConverter} from './lib/converters/snakeCaseToCamelCaseConverter';
import {sortByIdConverter} from './lib/converters/sortByIdConverter';
import {defaultLoader} from './lib/loaders/defaultLoader';
import {getNewLoader} from './lib/loaders/getNewLoader';
import {getStubLoader,getSimpleLoader,getOptionalLoader,getUpdater,getPublisher,getDeleter,getResourceInteraction} from './lib/loaders/requester';
import {stubLoader} from './lib/loaders/stubLoader';
import CustomSlice from './lib/slice-manager/CustomSlice';
import {getTtlPersistTransform} from './lib/slice-manager/getTtlPersistTransform';
import PersistSlice from './lib/slice-manager/PersistSlice';
import PersistSliceManager from './lib/slice-manager/PersistSliceManager';
import SliceManager from './lib/slice-manager/SliceManager';


const CaseCreator = CaseCreator;
const loadingApiCases = loadingApiCases;
const ConverterChain = ConverterChain;
const snakeCaseToCamelCaseConverter = snakeCaseToCamelCaseConverter;
const sortByIdConverter = sortByIdConverter;
const defaultLoader = defaultLoader;
const getNewLoader = getNewLoader;
const getStubLoader = getStubLoader;
const getSimpleLoader = getSimpleLoader;
const getOptionalLoader = getOptionalLoader;
const getUpdater = getUpdater;
const getPublisher = getPublisher;
const getDeleter = getDeleter;
const getResourceInteraction = getResourceInteraction;
const stubLoader = stubLoader;
const CustomSlice = CustomSlice;
const getTtlPersistTransform = getTtlPersistTransform;
const PersistSlice = PersistSlice;
const PersistSliceManager = PersistSliceManager;
const SliceManager = SliceManager;

export {
    CaseCreator,
    loadingApiCases,
    ConverterChain,
    snakeCaseToCamelCaseConverter,
    sortByIdConverter,
    defaultLoader,
    getNewLoader,
    getStubLoader,
    getSimpleLoader,
    getOptionalLoader,
    getUpdater,
    getPublisher,
    getDeleter,
    getResourceInteraction,
    stubLoader,
    CustomSlice,
    getTtlPersistTransform,
    PersistSlice,
    PersistSliceManager,
    SliceManager,
};