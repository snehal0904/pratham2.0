import { v4 as uuidv4 } from 'uuid';
import { post, patch } from './RestClient';
import { getLocalStoredUserId } from './LocalStorageService';
import { MIME_TYPE } from '@workspace/utils/app.config';
import axiosInstance from './Interceptor';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ContentCourseRow {
  domain?: string;
  sub_domain?: string;
  content_language?: string;
  primary_user?: string;
  target_age_group?: string;
  program?: string;
  course_keywords?: string;
  resource_desc?: string;
  author?: string;
  copyright?: string;
  copyright_year?: string;
  subjects?: string;
  type?: string;
  course_title?: string;
  course_thumb?: string;
  course_description?: string;
  cont_title?: string;
  cont_engtitle?: string;
  cont_url?: string;
  cont_dwurl?: string;
  cont_thumburl?: string;
  cont_thumb?: string;
  // set1-set10 with thumbs and descs
  set1?: string; set1_thumb?: string; set1_desc?: string;
  set2?: string; set2_thumb?: string; set2_desc?: string;
  set3?: string; set3_thumb?: string; set3_desc?: string;
  set4?: string; set4_thumb?: string; set4_desc?: string;
  set5?: string; set5_thumb?: string; set5_desc?: string;
  set6?: string; set6_thumb?: string; set6_desc?: string;
  set7?: string; set7_thumb?: string; set7_desc?: string;
  set8?: string; set8_thumb?: string; set8_desc?: string;
  set9?: string; set9_thumb?: string; set9_desc?: string;
  set10?: string; set10_thumb?: string; set10_desc?: string;
  [key: string]: string | undefined;
}

export interface ParsedContentItem {
  title: string;
  engTitle: string;
  url: string;
  downloadUrl: string;
  thumbnailUrl: string;
  mimeType: string;
  description: string;
  rowNum: number;
}

export interface ParsedUnit {
  name: string;
  thumbnail: string;
  description: string;
  contents: ParsedContentItem[];
}

export interface ParsedCourse {
  title: string;
  thumbnail: string;
  description: string;
  units: ParsedUnit[];
  metadata: CourseMetadata;
}

export interface CourseMetadata {
  domain: string;
  subDomain: string;
  language: string;
  primaryUser: string;
  targetAgeGroup: string;
  program: string;
  keywords: string;
  subjects: string;
  author: string;
  copyright: string;
  copyrightYear: string;
  resourceDesc: string;
}

export interface ValidationError {
  row: number;
  column: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ContentValidationResult {
  valid: boolean;
  errors: ValidationError[];
  contents: ParsedContentItem[];
  metadata: CourseMetadata;
}

export interface CourseValidationResult {
  valid: boolean;
  errors: ValidationError[];
  courses: ParsedCourse[];
}

export type ContentImportStatus =
  | 'pending'
  | 'creating'
  | 'uploading'
  | 'publishing'
  | 'done'
  | 'failed';

export type CourseImportStatus =
  | 'pending'
  | 'creating_content'
  | 'creating_course'
  | 'adding_hierarchy'
  | 'sending_review'
  | 'done'
  | 'failed';

export interface ContentImportProgress {
  name: string;
  status: ContentImportStatus;
  identifier?: string;
  error?: string;
}

export interface CourseImportProgress {
  name: string;
  status: CourseImportStatus;
  identifier?: string;
  error?: string;
  contentProgress?: { total: number; done: number };
}

export interface ImportResult {
  name: string;
  success: boolean;
  identifier?: string;
  error?: string;
  type: 'content' | 'course';
}

// ─────────────────────────────────────────────
// MimeType detection
// ─────────────────────────────────────────────

export function detectMimeType(url: string): string {
  if (!url) return 'text/x-url';
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be'))
    return 'video/x-youtube';
  const ext = lower.split('.').pop()?.split('?')[0] ?? '';
  const map: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    pdf: 'application/pdf',
    mp3: 'audio/mp3',
    wav: 'audio/wav',
    epub: 'application/epub',
    h5p: 'application/vnd.ekstep.h5p-archive',
  };
  return map[ext] ?? 'text/x-url';
}

// ─────────────────────────────────────────────
// Excel / CSV parsing helpers
// ─────────────────────────────────────────────

export function parseExcelToRows(file: File): Promise<{ rows: ContentCourseRow[]; headers: string[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const XLSX = await import('xlsx');
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: Record<string, string>[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        if (jsonData.length === 0) {
          reject(new Error('Excel file has no data rows'));
          return;
        }
        const headers = Object.keys(jsonData[0]);
        const rows: ContentCourseRow[] = jsonData.map((row) => {
          const cleaned: ContentCourseRow = {};
          for (const key of headers) {
            cleaned[key.trim()] = String(row[key] ?? '').trim();
          }
          return cleaned;
        });
        resolve({ rows, headers: headers.map((h) => h.trim()) });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

// ─────────────────────────────────────────────
// CSV Template downloads
// ─────────────────────────────────────────────

const CONTENT_TEMPLATE_HEADERS = [
  'cont_title', 'cont_url', 'cont_thumburl', 'content_language',
  'domain', 'sub_domain', 'subjects', 'author', 'copyright',
  'copyright_year', 'resource_desc', 'primary_user', 'program',
];

const CONTENT_TEMPLATE_ROWS = [
  [
    'Sample Video Content', 'https://example.com/video.mp4',
    'https://example.com/thumb.png', 'Hindi',
    'Learning for School', 'Media Moments', 'Low Tech',
    'Author Name', 'Pratham', '2024', 'Sample content description',
    'Learners/Children', 'Open School',
  ],
];

const COURSE_TEMPLATE_HEADERS = [
  'domain', 'sub_domain', 'content_language', 'primary_user', 'program',
  'subjects', 'author', 'copyright', 'copyright_year',
  'course_title', 'course_thumb', 'course_description',
  'set1', 'set1_thumb', 'set1_desc',
  'cont_title', 'cont_url', 'cont_thumburl', 'resource_desc',
];

const COURSE_TEMPLATE_ROWS = [
  [
    'Learning for School', 'Media Moments', 'Hindi',
    'Parents/Care givers, Educators, Learners/Children', 'Open School',
    'Low Tech', 'Author Name', 'Pratham', '2024',
    'Sample Course', 'https://example.com/course_thumb.png', 'A sample course',
    'Unit 1', 'https://example.com/unit_thumb.png', 'First unit',
    'Episode 1', 'https://example.com/video1.mp4', 'https://example.com/thumb1.png',
    'First episode content',
  ],
  [
    'Learning for School', 'Media Moments', 'Hindi',
    'Parents/Care givers, Educators, Learners/Children', 'Open School',
    'Low Tech', 'Author Name', 'Pratham', '2024',
    'Sample Course', 'https://example.com/course_thumb.png', 'A sample course',
    'Unit 1', 'https://example.com/unit_thumb.png', 'First unit',
    'Episode 2', 'https://example.com/video2.mp4', 'https://example.com/thumb2.png',
    'Second episode content',
  ],
];

function downloadCSV(headers: string[], rows: string[][], filename: string): void {
  const header = headers.join(',');
  const csvRows = rows.map((row) =>
    row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  );
  const csv = [header, ...csvRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadContentTemplate(): void {
  downloadCSV(CONTENT_TEMPLATE_HEADERS, CONTENT_TEMPLATE_ROWS, 'content_import_template.csv');
}

export function downloadCourseTemplate(): void {
  downloadCSV(COURSE_TEMPLATE_HEADERS, COURSE_TEMPLATE_ROWS, 'course_import_template.csv');
}

// ─────────────────────────────────────────────
// Validation: Content Import
// ─────────────────────────────────────────────

const CONTENT_REQUIRED_COLUMNS = ['cont_title', 'cont_url'] as const;

export function validateContentData(
  rows: ContentCourseRow[],
  headers: string[]
): ContentValidationResult {
  const errors: ValidationError[] = [];

  const missingCols = CONTENT_REQUIRED_COLUMNS.filter((c) => !headers.includes(c));
  if (missingCols.length > 0) {
    errors.push({
      row: 0,
      column: 'header',
      message: `Missing required columns: ${missingCols.join(', ')}`,
      severity: 'error',
    });
    return { valid: false, errors, contents: [], metadata: emptyMetadata() };
  }

  if (rows.length === 0) {
    errors.push({ row: 0, column: 'file', message: 'File has no data rows.', severity: 'error' });
    return { valid: false, errors, contents: [], metadata: emptyMetadata() };
  }

  const contents: ParsedContentItem[] = [];
  let metadata: CourseMetadata = emptyMetadata();
  let metaSet = false;

  rows.forEach((raw, idx) => {
    const rowNum = idx + 2;
    const title = (raw.cont_title || '').trim();
    const url = (raw.cont_url || '').trim();

    if (!title) {
      errors.push({ row: rowNum, column: 'cont_title', message: 'Content title is required.', severity: 'error' });
      return;
    }
    if (!url) {
      errors.push({ row: rowNum, column: 'cont_url', message: 'Content URL is required.', severity: 'error' });
      return;
    }

    const mimeType = detectMimeType(url);

    if (!metaSet) {
      metadata = extractMetadata(raw);
      metaSet = true;
    }

    contents.push({
      title,
      engTitle: (raw.cont_engtitle || '').trim(),
      url,
      downloadUrl: (raw.cont_dwurl || '').trim(),
      thumbnailUrl: (raw.cont_thumburl || raw.cont_thumb || '').trim(),
      mimeType,
      description: (raw.resource_desc || '').trim(),
      rowNum,
    });
  });

  if (contents.length === 0 && errors.length === 0) {
    errors.push({ row: 0, column: 'file', message: 'No valid content rows found.', severity: 'error' });
  }

  const hasErrors = errors.some((e) => e.severity === 'error');
  return { valid: !hasErrors, errors, contents, metadata };
}

// ─────────────────────────────────────────────
// Validation: Course Import
// ─────────────────────────────────────────────

const COURSE_REQUIRED_COLUMNS = ['course_title', 'cont_title', 'cont_url'] as const;

export function validateCourseData(
  rows: ContentCourseRow[],
  headers: string[]
): CourseValidationResult {
  const errors: ValidationError[] = [];

  const missingCols = COURSE_REQUIRED_COLUMNS.filter((c) => !headers.includes(c));
  if (missingCols.length > 0) {
    errors.push({
      row: 0,
      column: 'header',
      message: `Missing required columns: ${missingCols.join(', ')}`,
      severity: 'error',
    });
    return { valid: false, errors, courses: [] };
  }

  // Check that at least one set column or unit column exists
  const hasSetColumns = Array.from({ length: 10 }, (_, i) => `set${i + 1}`).some(
    (col) => headers.includes(col)
  );
  if (!hasSetColumns) {
    errors.push({
      row: 0,
      column: 'header',
      message: 'At least one unit column (set1–set10) is required for course import.',
      severity: 'error',
    });
    return { valid: false, errors, courses: [] };
  }

  if (rows.length === 0) {
    errors.push({ row: 0, column: 'file', message: 'File has no data rows.', severity: 'error' });
    return { valid: false, errors, courses: [] };
  }

  // Group rows by course_title
  const courseMap = new Map<string, { meta: CourseMetadata; rows: { raw: ContentCourseRow; rowNum: number }[] }>();

  rows.forEach((raw, idx) => {
    const rowNum = idx + 2;
    const courseTitle = (raw.course_title || '').trim();
    const contTitle = (raw.cont_title || '').trim();
    const contUrl = (raw.cont_url || '').trim();

    if (!courseTitle) {
      errors.push({ row: rowNum, column: 'course_title', message: 'Course title is required.', severity: 'error' });
      return;
    }
    if (!contTitle) {
      errors.push({ row: rowNum, column: 'cont_title', message: 'Content title is required.', severity: 'error' });
      return;
    }
    if (!contUrl) {
      errors.push({ row: rowNum, column: 'cont_url', message: 'Content URL is required.', severity: 'error' });
      return;
    }

    if (!courseMap.has(courseTitle)) {
      courseMap.set(courseTitle, {
        meta: extractMetadata(raw),
        rows: [],
      });
    }
    courseMap.get(courseTitle)!.rows.push({ raw, rowNum });
  });

  // Build courses
  const courses: ParsedCourse[] = [];

  courseMap.forEach((entry, courseTitle) => {
    const firstRow = entry.rows[0]?.raw;
    const unitMap = new Map<string, ParsedUnit>();

    entry.rows.forEach(({ raw, rowNum }) => {
      // Determine which unit this content belongs to
      const unitName = findUnitName(raw);
      if (!unitName) {
        errors.push({
          row: rowNum,
          column: 'set1',
          message: `No unit name found (set1–set10 are all empty) for course "${courseTitle}".`,
          severity: 'error',
        });
        return;
      }

      if (!unitMap.has(unitName)) {
        const unitInfo = findUnitInfo(raw, unitName);
        unitMap.set(unitName, {
          name: unitName,
          thumbnail: unitInfo.thumbnail,
          description: unitInfo.description,
          contents: [],
        });
      }

      const url = (raw.cont_url || '').trim();
      unitMap.get(unitName)!.contents.push({
        title: (raw.cont_title || '').trim(),
        engTitle: (raw.cont_engtitle || '').trim(),
        url,
        downloadUrl: (raw.cont_dwurl || '').trim(),
        thumbnailUrl: (raw.cont_thumburl || raw.cont_thumb || '').trim(),
        mimeType: detectMimeType(url),
        description: (raw.resource_desc || '').trim(),
        rowNum,
      });
    });

    courses.push({
      title: courseTitle,
      thumbnail: (firstRow?.course_thumb || '').trim(),
      description: (firstRow?.course_description || '').trim(),
      units: Array.from(unitMap.values()),
      metadata: entry.meta,
    });
  });

  if (courses.length === 0 && errors.length === 0) {
    errors.push({ row: 0, column: 'file', message: 'No valid courses found.', severity: 'error' });
  }

  const hasErrors = errors.some((e) => e.severity === 'error');
  return { valid: !hasErrors, errors, courses };
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function emptyMetadata(): CourseMetadata {
  return {
    domain: '', subDomain: '', language: '', primaryUser: '',
    targetAgeGroup: '', program: '', keywords: '', subjects: '',
    author: '', copyright: '', copyrightYear: '', resourceDesc: '',
  };
}

function extractMetadata(raw: ContentCourseRow): CourseMetadata {
  return {
    domain: (raw.domain || '').trim(),
    subDomain: (raw.sub_domain || '').trim(),
    language: (raw.content_language || '').trim(),
    primaryUser: (raw.primary_user || '').trim(),
    targetAgeGroup: (raw.target_age_group || '').trim(),
    program: (raw.program || '').trim(),
    keywords: (raw.course_keywords || '').trim(),
    subjects: (raw.subjects || '').trim(),
    author: (raw.author || '').trim(),
    copyright: (raw.copyright || '').trim(),
    copyrightYear: (raw.copyright_year || '').trim(),
    resourceDesc: (raw.resource_desc || '').trim(),
  };
}

function findUnitName(raw: ContentCourseRow): string | null {
  for (let i = 1; i <= 10; i++) {
    const val = (raw[`set${i}`] || '').trim();
    if (val) return val;
  }
  return null;
}

function findUnitInfo(raw: ContentCourseRow, unitName: string): { thumbnail: string; description: string } {
  for (let i = 1; i <= 10; i++) {
    const val = (raw[`set${i}`] || '').trim();
    if (val === unitName) {
      return {
        thumbnail: (raw[`set${i}_thumb`] || '').trim(),
        description: (raw[`set${i}_desc`] || '').trim(),
      };
    }
  }
  return { thumbnail: '', description: '' };
}

// ─────────────────────────────────────────────
// Framework helpers
// ─────────────────────────────────────────────

export function getContentFramework(): string {
  if (typeof window === 'undefined') return '';
  const tenantId = localStorage.getItem('tenantId') || '';
  const configStr = localStorage.getItem(`tenantConfig_${tenantId}`);
  if (configStr) {
    try {
      const config = JSON.parse(configStr);
      if (config.CONTENT_FRAMEWORK) return config.CONTENT_FRAMEWORK;
    } catch { /* ignore */ }
  }
  return '';
}

export function getCollectionFramework(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('collectionFramework') || '';
}

export function getChannelId(): string {
  if (typeof window === 'undefined') return '';
  const tenantId = localStorage.getItem('tenantId') || '';
  const configStr = localStorage.getItem(`tenantConfig_${tenantId}`);
  if (configStr) {
    try {
      const config = JSON.parse(configStr);
      if (config.CHANNEL_ID) return config.CHANNEL_ID;
    } catch { /* ignore */ }
  }
  return '';
}

// ─────────────────────────────────────────────
// API: Content creation + publish
// ─────────────────────────────────────────────

export async function createContentAPI(
  content: ParsedContentItem,
  metadata: CourseMetadata,
  framework: string,
  channelId: string
): Promise<string> {
  const userId = getLocalStoredUserId() || '';
  const reqBody = {
    request: {
      content: {
        name: content.title,
        code: uuidv4(),
        mimeType: content.mimeType,
        primaryCategory: 'Learning Resource',
        createdBy: userId,
        createdFor: [channelId],
        framework,
        resourceType: 'Learn',
        contentType: 'Resource',
        ...(metadata.language ? { language: [metadata.language] } : {}),
        ...(metadata.domain ? { domain: metadata.domain } : {}),
        ...(metadata.subDomain ? { subDomain: [metadata.subDomain] } : {}),
        ...(metadata.subjects ? { subject: [metadata.subjects] } : {}),
        ...(metadata.author ? { author: metadata.author } : {}),
        ...(metadata.copyright ? { copyright: metadata.copyright } : {}),
        ...(metadata.copyrightYear ? { copyrightYear: metadata.copyrightYear } : {}),
        ...(content.description ? { description: content.description } : {}),
        ...(content.thumbnailUrl ? { appIcon: content.thumbnailUrl, posterImage: content.thumbnailUrl } : {}),
        ...(metadata.primaryUser ? { audience: metadata.primaryUser.split(',').map((s: string) => s.trim()) } : {}),
        ...(metadata.program ? { program: [metadata.program] } : {}),
        ...(metadata.keywords ? { keywords: metadata.keywords.split(',').map((s: string) => s.trim()) } : {}),
        license: 'CC BY 4.0',
      },
    },
  };

  const response = await post('/action/content/v3/create', reqBody);
  const identifier = response?.data?.result?.identifier;
  if (!identifier) throw new Error('Failed to create content: no identifier returned');
  return identifier;
}

export async function uploadContentWithURL(
  identifier: string,
  fileUrl: string,
  mimeType: string
): Promise<void> {
  const formData = new FormData();
  formData.append('fileUrl', fileUrl);
  formData.append('mimeType', mimeType);

  const response = await axiosInstance.post(
    `/action/content/v3/upload/${identifier}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

  if (!response?.data?.result?.content_url && !response?.data?.result?.artifactUrl) {
    throw new Error('Upload failed: no content_url returned');
  }
}

export async function publishContentAPI(identifier: string): Promise<void> {
  const userId = getLocalStoredUserId() || '';
  const reqBody = {
    request: {
      content: {
        lastPublishedBy: userId,
        publishChecklist: [
          'No Hate speech, Abuse, Violence, Profanity',
          'Is suitable for children',
          'Correct Board, Grade, Subject, Medium',
          'Appropriate Title, Description',
          'No Sexual content, Nudity or Vulgarity',
          'No Discrimination or Defamation',
          'Appropriate tags such as Resource Type, Concepts',
          'Relevant Keywords',
          'Content is not Plagiarised',
          'No Spelling mistakes in the Content',
        ],
      },
    },
  };

  const response = await post(`/action/content/v3/publish/${identifier}`, reqBody);
  if (response?.data?.responseCode !== 'OK') {
    throw new Error(`Publish failed: ${response?.data?.params?.errmsg ?? 'Unknown error'}`);
  }
}

// ─────────────────────────────────────────────
// API: Course creation + hierarchy + review
// ─────────────────────────────────────────────

export async function createCourseAPI(
  courseName: string,
  metadata: CourseMetadata,
  contentFramework: string,
  collectionFramework: string,
  channelId: string
): Promise<string> {
  const userId = getLocalStoredUserId() || '';
  const reqBody = {
    request: {
      content: {
        code: uuidv4(),
        name: courseName,
        createdBy: userId,
        createdFor: [channelId],
        mimeType: MIME_TYPE.COURSE_MIME_TYPE,
        resourceType: 'Course',
        primaryCategory: 'Course',
        contentType: 'Course',
        framework: contentFramework,
        targetFWIds: [collectionFramework],
        ...(metadata.language ? { language: [metadata.language] } : {}),
        ...(metadata.domain ? { domain: metadata.domain } : {}),
        ...(metadata.subDomain ? { subDomain: [metadata.subDomain] } : {}),
        ...(metadata.subjects ? { subject: [metadata.subjects] } : {}),
        ...(metadata.author ? { author: metadata.author } : {}),
        ...(metadata.copyright ? { copyright: metadata.copyright } : {}),
        ...(metadata.primaryUser ? { audience: metadata.primaryUser.split(',').map((s: string) => s.trim()) } : {}),
        ...(metadata.program ? { program: [metadata.program] } : {}),
        ...(metadata.keywords ? { keywords: metadata.keywords.split(',').map((s: string) => s.trim()) } : {}),
        license: 'CC BY 4.0',
      },
    },
  };

  const response = await post('/action/content/v3/create', reqBody);
  const identifier = response?.data?.result?.identifier;
  if (!identifier) throw new Error('Failed to create course: no identifier returned');
  return identifier;
}

export async function updateCourseHierarchy(
  courseId: string,
  course: ParsedCourse,
  contentIdentifiers: Map<string, string> // cont_title+rowNum → identifier
): Promise<void> {
  const userId = getLocalStoredUserId() || '';
  const nodesModified: Record<string, unknown> = {};
  const hierarchy: Record<string, unknown> = {};

  // Course root node (update, not new)
  nodesModified[courseId] = {
    root: true,
    objectType: 'Content',
    isNew: false,
    metadata: {
      name: course.title,
      description: course.description || course.title,
      mimeType: MIME_TYPE.COURSE_MIME_TYPE,
      primaryCategory: 'Course',
      ...(course.thumbnail ? { appIcon: course.thumbnail, posterImage: course.thumbnail } : {}),
    },
  };

  const unitIds: string[] = [];

  course.units.forEach((unit) => {
    const unitId = uuidv4();
    unitIds.push(unitId);

    // Unit node (new)
    nodesModified[unitId] = {
      root: false,
      objectType: 'Content',
      isNew: true,
      metadata: {
        name: unit.name,
        description: unit.description || unit.name,
        mimeType: MIME_TYPE.COLLECTION_MIME_TYPE,
        primaryCategory: 'Course Unit',
        visibility: 'Parent',
        code: unitId,
        ...(unit.thumbnail ? { appIcon: unit.thumbnail, posterImage: unit.thumbnail } : {}),
      },
    };

    // Map content to their identifiers
    const childIds: string[] = [];
    unit.contents.forEach((content) => {
      const key = `${content.title}_${content.rowNum}`;
      const contentId = contentIdentifiers.get(key);
      if (contentId) {
        childIds.push(contentId);
      }
    });

    hierarchy[unitId] = {
      name: unit.name,
      children: childIds,
      root: false,
    };
  });

  hierarchy[courseId] = {
    name: course.title,
    children: unitIds,
    root: true,
  };

  const reqBody = {
    request: {
      data: {
        nodesModified,
        hierarchy,
        lastUpdatedBy: userId,
      },
    },
  };

  const response = await patch(
    '/action/content/v3/hierarchy/update',
    reqBody,
    { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json' }
  );

  if (!response?.data?.result) {
    throw new Error('Course hierarchy update failed');
  }
}

export async function sendCourseForReview(identifier: string): Promise<void> {
  const response = await post(`/action/content/v3/review/${identifier}`, {
    request: { content: {} },
  });
  if (response?.data?.responseCode !== 'OK') {
    throw new Error(
      `Send-for-review failed: ${response?.data?.params?.errmsg ?? 'Unknown error'}`
    );
  }
}

// ─────────────────────────────────────────────
// Orchestrator: Import single content item
// ─────────────────────────────────────────────

export async function importSingleContent(
  content: ParsedContentItem,
  metadata: CourseMetadata,
  framework: string,
  channelId: string,
  onProgress: (status: ContentImportStatus) => void
): Promise<ImportResult> {
  try {
    onProgress('creating');
    const identifier = await createContentAPI(content, metadata, framework, channelId);

    onProgress('uploading');
    await uploadContentWithURL(identifier, content.url, content.mimeType);

    onProgress('publishing');
    await publishContentAPI(identifier);

    onProgress('done');
    return { name: content.title, success: true, identifier, type: 'content' };
  } catch (err: any) {
    onProgress('failed');
    console.error(`[ContentImport] "${content.title}" failed:`, err);
    return {
      name: content.title,
      success: false,
      error: err?.response?.data?.params?.errmsg || err?.message || String(err),
      type: 'content',
    };
  }
}

// ─────────────────────────────────────────────
// Orchestrator: Import single course
// ─────────────────────────────────────────────

export async function importSingleCourse(
  course: ParsedCourse,
  contentFramework: string,
  collectionFramework: string,
  channelId: string,
  onProgress: (status: CourseImportStatus, contentProgress?: { total: number; done: number }) => void
): Promise<ImportResult> {
  try {
    // Phase 1: Create and publish all content items
    const allContents = course.units.flatMap((u) => u.contents);
    const contentIdentifiers = new Map<string, string>();

    onProgress('creating_content', { total: allContents.length, done: 0 });

    for (let i = 0; i < allContents.length; i++) {
      const content = allContents[i];
      try {
        const identifier = await createContentAPI(
          content,
          course.metadata,
          contentFramework,
          channelId
        );
        await uploadContentWithURL(identifier, content.url, content.mimeType);
        await publishContentAPI(identifier);
        contentIdentifiers.set(`${content.title}_${content.rowNum}`, identifier);
      } catch (err: any) {
        console.error(`[CourseImport] Content "${content.title}" failed:`, err);
        // Continue with other content items
        contentIdentifiers.set(
          `${content.title}_${content.rowNum}`,
          `FAILED:${err?.message || 'Unknown'}`
        );
      }
      onProgress('creating_content', { total: allContents.length, done: i + 1 });
    }

    // Remove failed entries from identifiers
    const validIdentifiers = new Map<string, string>();
    contentIdentifiers.forEach((val, key) => {
      if (!val.startsWith('FAILED:')) validIdentifiers.set(key, val);
    });

    // Phase 2: Create course
    onProgress('creating_course');
    const courseId = await createCourseAPI(
      course.title,
      course.metadata,
      contentFramework,
      collectionFramework,
      channelId
    );

    // Phase 3: Add hierarchy
    onProgress('adding_hierarchy');
    await updateCourseHierarchy(courseId, course, validIdentifiers);

    // Phase 4: Send for review
    onProgress('sending_review');
    await sendCourseForReview(courseId);

    onProgress('done');
    return { name: course.title, success: true, identifier: courseId, type: 'course' };
  } catch (err: any) {
    onProgress('failed');
    console.error(`[CourseImport] "${course.title}" failed:`, err);
    return {
      name: course.title,
      success: false,
      error: err?.response?.data?.params?.errmsg || err?.message || String(err),
      type: 'course',
    };
  }
}
