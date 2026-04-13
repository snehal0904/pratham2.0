import React, { useCallback, useRef, useState } from 'react';
import Papa from 'papaparse';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReplayIcon from '@mui/icons-material/Replay';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import Layout from '../../../../components/Layout';
import WorkspaceText from '../../../../components/WorkspaceText';
import WorkspaceHeader from '../../../../components/WorkspaceHeader';
import useTenantConfig from '../../../../hooks/useTenantConfig';
import {
  ContentCourseRow,
  ContentImportProgress,
  ContentImportStatus,
  ContentValidationResult,
  CourseImportProgress,
  CourseImportStatus,
  CourseValidationResult,
  ImportResult,
  ParsedContentItem,
  ParsedCourse,
  ValidationError,
  downloadContentTemplate,
  downloadCourseTemplate,
  getChannelId,
  getCollectionFramework,
  getContentFramework,
  importSingleContent,
  importSingleCourse,
  parseExcelToRows,
  validateContentData,
  validateCourseData,
} from '../../../../services/ContentCourseImportService';

type ImportMode = 'content' | 'course';

// ─────────────────────────────────────────────
// Status badges
// ─────────────────────────────────────────────

const ContentStatusBadge: React.FC<{ status: ContentImportStatus }> = ({ status }) => {
  const map: Record<ContentImportStatus, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
    pending:    { label: 'Pending',      color: 'default' },
    creating:   { label: 'Creating...',  color: 'info' },
    uploading:  { label: 'Uploading...', color: 'info' },
    publishing: { label: 'Publishing...', color: 'warning' },
    done:       { label: 'Published',    color: 'success' },
    failed:     { label: 'Failed',       color: 'error' },
  };
  const { label, color } = map[status];
  return <Chip label={label} color={color} size="small" />;
};

const CourseStatusBadge: React.FC<{ status: CourseImportStatus }> = ({ status }) => {
  const map: Record<CourseImportStatus, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error' }> = {
    pending:          { label: 'Pending',            color: 'default' },
    creating_content: { label: 'Creating content...', color: 'info' },
    creating_course:  { label: 'Creating course...',  color: 'info' },
    adding_hierarchy: { label: 'Adding hierarchy...', color: 'info' },
    sending_review:   { label: 'Sending for review...', color: 'warning' },
    done:             { label: 'Under Review',       color: 'success' },
    failed:           { label: 'Failed',             color: 'error' },
  };
  const { label, color } = map[status];
  return <Chip label={label} color={color} size="small" />;
};

// ─────────────────────────────────────────────
// Content preview
// ─────────────────────────────────────────────

const ContentPreviewTable: React.FC<{ contents: ParsedContentItem[] }> = ({ contents }) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? contents : contents.slice(0, 10);

  return (
    <Box>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={30}>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((c, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell sx={{ maxWidth: 250 }}>{c.title}</TableCell>
                <TableCell sx={{ maxWidth: 300, wordBreak: 'break-all' }}>
                  <Typography variant="caption">{c.url.slice(0, 80)}{c.url.length > 80 ? '...' : ''}</Typography>
                </TableCell>
                <TableCell><Chip label={c.mimeType.split('/').pop()} size="small" variant="outlined" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {contents.length > 10 && (
        <Button size="small" onClick={() => setShowAll((v) => !v)} sx={{ mt: 1 }}>
          {showAll ? 'Show fewer' : `Show all ${contents.length} items`}
        </Button>
      )}
    </Box>
  );
};

// ─────────────────────────────────────────────
// Course preview accordion
// ─────────────────────────────────────────────

const CoursePreview: React.FC<{ course: ParsedCourse; idx: number }> = ({ course, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  const totalContent = course.units.reduce((s, u) => s + u.contents.length, 0);

  return (
    <Paper variant="outlined" sx={{ mb: 1 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2} py={1}
        sx={{ cursor: 'pointer' }}
        onClick={() => setOpen((o) => !o)}
      >
        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <Typography fontWeight={600}>{course.title}</Typography>
          <Chip label={`${course.units.length} unit${course.units.length !== 1 ? 's' : ''}`} size="small" />
          <Chip label={`${totalContent} content`} size="small" color="primary" variant="outlined" />
          {course.metadata.language && <Chip label={course.metadata.language} size="small" variant="outlined" />}
          {course.metadata.program && <Chip label={course.metadata.program} size="small" variant="outlined" />}
        </Box>
        <IconButton size="small">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={open}>
        <Divider />
        {(course.metadata.domain || course.metadata.subDomain || course.description) && (
          <Box px={2} py={1} bgcolor="action.hover" display="flex" gap={1} flexWrap="wrap" alignItems="center">
            {course.metadata.domain && (
              <Typography variant="caption" color="text.secondary">
                Domain: <strong>{course.metadata.domain}</strong>
              </Typography>
            )}
            {course.metadata.subDomain && (
              <Typography variant="caption" color="text.secondary">
                Sub-domain: <strong>{course.metadata.subDomain}</strong>
              </Typography>
            )}
            {course.description && (
              <Typography variant="caption" color="text.secondary">| {course.description}</Typography>
            )}
          </Box>
        )}
        {course.units.map((unit, ui) => (
          <Box key={ui} px={2} pb={1}>
            <Typography variant="subtitle2" fontWeight={600} mt={1} mb={0.5}>
              {unit.name}{' '}
              <Typography component="span" variant="caption" color="text.secondary">
                ({unit.contents.length} content item{unit.contents.length !== 1 ? 's' : ''})
              </Typography>
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={30}>#</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unit.contents.map((c, ci) => (
                    <TableRow key={ci}>
                      <TableCell>{ci + 1}</TableCell>
                      <TableCell sx={{ maxWidth: 250 }}>{c.title}</TableCell>
                      <TableCell sx={{ maxWidth: 300, wordBreak: 'break-all' }}>
                        <Typography variant="caption">{c.url.slice(0, 60)}{c.url.length > 60 ? '...' : ''}</Typography>
                      </TableCell>
                      <TableCell><Chip label={c.mimeType.split('/').pop()} size="small" variant="outlined" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Collapse>
    </Paper>
  );
};

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────

const ContentCourseImportPage: React.FC = () => {
  const theme = useTheme();
  const tenantConfig = useTenantConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showHeader, setShowHeader] = useState<boolean | null>(null);
  const [importMode, setImportMode] = useState<ImportMode>('course');
  const [activeStep, setActiveStep] = useState(0);

  // Step 0
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Step 1 - Content mode
  const [contentValidation, setContentValidation] = useState<ContentValidationResult | null>(null);
  // Step 1 - Course mode
  const [courseValidation, setCourseValidation] = useState<CourseValidationResult | null>(null);
  const [showAllErrors, setShowAllErrors] = useState(false);

  // Step 2 - Content import progress
  const [contentProgressMap, setContentProgressMap] = useState<Map<string, ContentImportProgress>>(new Map());
  // Step 2 - Course import progress
  const [courseProgressMap, setCourseProgressMap] = useState<Map<string, CourseImportProgress>>(new Map());
  const [isImporting, setIsImporting] = useState(false);

  // Step 3
  const [results, setResults] = useState<ImportResult[]>([]);

  React.useEffect(() => {
    const v = localStorage.getItem('showHeader');
    setShowHeader(v === 'true');
  }, []);

  // ── File handling ──────────────────────────────────────────────────────────

  const parseFile = useCallback(async (file: File) => {
    const isCSV = file.name.toLowerCase().endsWith('.csv');
    const isExcel = file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls');

    if (!isCSV && !isExcel) {
      const errResult = {
        valid: false,
        errors: [{
          row: 0,
          column: 'file',
          message: 'Only .csv and .xlsx files are accepted.',
          severity: 'error' as const,
        }],
      };
      if (importMode === 'content') {
        setContentValidation({ ...errResult, contents: [], metadata: { domain: '', subDomain: '', language: '', primaryUser: '', targetAgeGroup: '', program: '', keywords: '', subjects: '', author: '', copyright: '', copyrightYear: '', resourceDesc: '' } });
      } else {
        setCourseValidation({ ...errResult, courses: [] });
      }
      setActiveStep(1);
      return;
    }

    setFileName(file.name);

    try {
      let rows: ContentCourseRow[];
      let headers: string[];

      if (isExcel) {
        const result = await parseExcelToRows(file);
        rows = result.rows;
        headers = result.headers;
      } else {
        // CSV parsing
        const csvResult = await new Promise<{ rows: ContentCourseRow[]; headers: string[] }>((resolve, reject) => {
          Papa.parse<ContentCourseRow>(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (h) => h.trim(),
            transform: (v) => v.trim(),
            complete: (result) => {
              resolve({
                rows: result.data as ContentCourseRow[],
                headers: result.meta.fields ?? [],
              });
            },
            error: (err) => reject(err),
          });
        });
        rows = csvResult.rows;
        headers = csvResult.headers;
      }

      if (importMode === 'content') {
        setContentValidation(validateContentData(rows, headers));
      } else {
        setCourseValidation(validateCourseData(rows, headers));
      }
      setActiveStep(1);
    } catch (err: any) {
      const errResult = {
        valid: false,
        errors: [{
          row: 0,
          column: 'file',
          message: `Failed to parse file: ${err.message}`,
          severity: 'error' as const,
        }],
      };
      if (importMode === 'content') {
        setContentValidation({ ...errResult, contents: [], metadata: { domain: '', subDomain: '', language: '', primaryUser: '', targetAgeGroup: '', program: '', keywords: '', subjects: '', author: '', copyright: '', copyrightYear: '', resourceDesc: '' } });
      } else {
        setCourseValidation({ ...errResult, courses: [] });
      }
      setActiveStep(1);
    }
  }, [importMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
    e.target.value = '';
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) parseFile(file);
    },
    [parseFile]
  );

  // ── Import ─────────────────────────────────────────────────────────────────

  const startContentImport = async () => {
    if (!contentValidation?.contents.length) return;

    setIsImporting(true);
    setActiveStep(2);

    const framework = tenantConfig?.CONTENT_FRAMEWORK || getContentFramework();
    const channelId = tenantConfig?.CHANNEL_ID || getChannelId();

    // Init progress
    const initMap = new Map<string, ContentImportProgress>(
      contentValidation.contents.map((c, i) => [
        `${c.title}_${i}`,
        { name: c.title, status: 'pending' },
      ])
    );
    setContentProgressMap(new Map(initMap));

    const importResults: ImportResult[] = [];

    for (let i = 0; i < contentValidation.contents.length; i++) {
      const content = contentValidation.contents[i];
      const key = `${content.title}_${i}`;
      const result = await importSingleContent(
        content,
        contentValidation.metadata,
        framework,
        channelId,
        (status) => {
          setContentProgressMap((prev) => {
            const next = new Map(prev);
            next.set(key, { ...next.get(key)!, status });
            return next;
          });
        }
      );
      importResults.push(result);
    }

    setResults(importResults);
    setIsImporting(false);
    setActiveStep(3);
  };

  const startCourseImport = async () => {
    if (!courseValidation?.courses.length) return;

    setIsImporting(true);
    setActiveStep(2);

    const contentFW = tenantConfig?.CONTENT_FRAMEWORK || getContentFramework();
    const collectionFW = getCollectionFramework() || tenantConfig?.COLLECTION_FRAMEWORK || '';
    const channelId = tenantConfig?.CHANNEL_ID || getChannelId();

    // Init progress
    const initMap = new Map<string, CourseImportProgress>(
      courseValidation.courses.map((c) => [
        c.title,
        { name: c.title, status: 'pending' },
      ])
    );
    setCourseProgressMap(new Map(initMap));

    const importResults: ImportResult[] = [];

    for (const course of courseValidation.courses) {
      const result = await importSingleCourse(
        course,
        contentFW,
        collectionFW,
        channelId,
        (status, contentProgress) => {
          setCourseProgressMap((prev) => {
            const next = new Map(prev);
            next.set(course.title, {
              ...next.get(course.title)!,
              status,
              contentProgress,
            });
            return next;
          });
        }
      );
      importResults.push(result);
    }

    setResults(importResults);
    setIsImporting(false);
    setActiveStep(3);
  };

  // ── Reset ──────────────────────────────────────────────────────────────────

  const resetAll = () => {
    setFileName(null);
    setContentValidation(null);
    setCourseValidation(null);
    setContentProgressMap(new Map());
    setCourseProgressMap(new Map());
    setResults([]);
    setShowAllErrors(false);
    setIsImporting(false);
    setActiveStep(0);
  };

  // ─────────────────────────────────────────────
  // Derived state
  // ─────────────────────────────────────────────

  const validation = importMode === 'content' ? contentValidation : courseValidation;
  const allErrors: ValidationError[] = validation?.errors ?? [];
  const visibleErrors = showAllErrors ? allErrors : allErrors.slice(0, 10);
  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;

  // ─────────────────────────────────────────────
  // Step panels
  // ─────────────────────────────────────────────

  const renderUploadStep = () => (
    <Box>
      {/* Template download */}
      <Box display="flex" gap={1} mb={2} flexWrap="wrap">
        <Button
          startIcon={<DownloadIcon />}
          variant="outlined"
          size="small"
          onClick={importMode === 'content' ? downloadContentTemplate : downloadCourseTemplate}
        >
          Download {importMode === 'content' ? 'Content' : 'Course'} CSV Template
        </Button>
      </Box>

      {/* Drop zone */}
      <Box
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.divider}`,
          borderRadius: 2,
          p: 5,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <CloudUploadOutlinedIcon sx={{ fontSize: 52, color: 'text.secondary', mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          Drag &amp; drop a file here
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to browse &nbsp;&middot;&nbsp; Accepts .csv and .xlsx files
        </Typography>
        {fileName && <Chip label={fileName} color="primary" sx={{ mt: 2 }} />}
      </Box>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Column reference */}
      <Box mt={3}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          {importMode === 'content' ? 'Content' : 'Course'} Column Reference
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Column</strong></TableCell>
                <TableCell><strong>Required</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importMode === 'content'
                ? [
                    { col: 'cont_title', req: 'Yes', desc: 'Content title / name.' },
                    { col: 'cont_url', req: 'Yes', desc: 'Content URL (video, PDF, etc.).' },
                    { col: 'cont_thumburl', req: 'No', desc: 'Thumbnail image URL.' },
                    { col: 'content_language', req: 'No', desc: 'Language (e.g., Hindi, English).' },
                    { col: 'domain', req: 'No', desc: 'Content domain.' },
                    { col: 'sub_domain', req: 'No', desc: 'Content sub-domain.' },
                    { col: 'subjects', req: 'No', desc: 'Subject.' },
                    { col: 'author', req: 'No', desc: 'Author name.' },
                    { col: 'copyright', req: 'No', desc: 'Copyright holder.' },
                    { col: 'resource_desc', req: 'No', desc: 'Content description.' },
                    { col: 'primary_user', req: 'No', desc: 'Target audience.' },
                    { col: 'program', req: 'No', desc: 'Program name.' },
                  ].map(({ col, req, desc }) => (
                    <TableRow key={col}>
                      <TableCell><code>{col}</code></TableCell>
                      <TableCell>
                        <Chip label={req} size="small" color={req === 'Yes' ? 'error' : 'default'} variant="outlined" />
                      </TableCell>
                      <TableCell>{desc}</TableCell>
                    </TableRow>
                  ))
                : [
                    { col: 'course_title', req: 'Yes', desc: 'Course name (groups rows into one course).' },
                    { col: 'cont_title', req: 'Yes', desc: 'Content title within the course.' },
                    { col: 'cont_url', req: 'Yes', desc: 'Content URL (video, PDF, etc.).' },
                    { col: 'set1–set10', req: 'Yes*', desc: 'Unit/module name. At least one set column required.' },
                    { col: 'set1_thumb–set10_thumb', req: 'No', desc: 'Unit thumbnail URL.' },
                    { col: 'set1_desc–set10_desc', req: 'No', desc: 'Unit description.' },
                    { col: 'course_thumb', req: 'No', desc: 'Course thumbnail URL.' },
                    { col: 'course_description', req: 'No', desc: 'Course description.' },
                    { col: 'cont_thumburl', req: 'No', desc: 'Content thumbnail URL.' },
                    { col: 'content_language', req: 'No', desc: 'Language (e.g., Hindi, English).' },
                    { col: 'domain', req: 'No', desc: 'Content domain.' },
                    { col: 'sub_domain', req: 'No', desc: 'Content sub-domain.' },
                    { col: 'subjects', req: 'No', desc: 'Subject.' },
                    { col: 'author', req: 'No', desc: 'Author name.' },
                    { col: 'copyright', req: 'No', desc: 'Copyright holder.' },
                    { col: 'program', req: 'No', desc: 'Program name.' },
                  ].map(({ col, req, desc }) => (
                    <TableRow key={col}>
                      <TableCell><code>{col}</code></TableCell>
                      <TableCell>
                        <Chip label={req} size="small" color={req === 'Yes' || req === 'Yes*' ? 'error' : 'default'} variant="outlined" />
                      </TableCell>
                      <TableCell>{desc}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="info" sx={{ mt: 2 }} icon={<InfoOutlinedIcon />}>
          <AlertTitle>Tips</AlertTitle>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {importMode === 'content' ? (
              <>
                <li>Each row represents one content item that will be created and <strong>auto-published</strong>.</li>
                <li>Content type (mimeType) is automatically detected from the URL extension.</li>
                <li>Supported types: MP4, WebM, PDF, MP3, WAV, EPUB, YouTube URLs.</li>
              </>
            ) : (
              <>
                <li>Rows with the <strong>same course_title</strong> are grouped into one course.</li>
                <li>Each content is placed into the unit specified by <strong>set1–set10</strong> (first non-empty set).</li>
                <li>Content items are auto-published, then courses are assembled and <strong>sent for review</strong>.</li>
                <li>You can have up to 10 units per course using set1 through set10.</li>
              </>
            )}
            <li>Both <strong>.csv</strong> and <strong>.xlsx</strong> (Excel) files are accepted.</li>
          </ul>
        </Alert>
      </Box>
    </Box>
  );

  const renderValidationStep = () => {
    if (!validation) return null;
    const { valid, errors } = validation;
    const errCount = errors.filter((e) => e.severity === 'error').length;
    const warnCount = errors.filter((e) => e.severity === 'warning').length;

    const isContent = importMode === 'content';
    const itemCount = isContent
      ? (contentValidation?.contents.length ?? 0)
      : (courseValidation?.courses.length ?? 0);
    const itemLabel = isContent ? 'content item' : 'course';

    return (
      <Box>
        {valid ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Validation Passed</AlertTitle>
            {itemCount} {itemLabel}{itemCount !== 1 ? 's' : ''} ready to import.
            {warnCount > 0 && ` (${warnCount} warning${warnCount !== 1 ? 's' : ''})`}
          </Alert>
        ) : (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Validation Failed — {errCount} error{errCount !== 1 ? 's' : ''}</AlertTitle>
            Fix the issues below and upload the file again.
          </Alert>
        )}

        {/* Errors table */}
        {errors.length > 0 && (
          <Box mb={3}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Issues ({errors.length})
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Severity</TableCell>
                    <TableCell>Row</TableCell>
                    <TableCell>Column</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleErrors.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Chip label={e.severity} size="small" color={e.severity === 'error' ? 'error' : 'warning'} />
                      </TableCell>
                      <TableCell>{e.row === 0 ? '—' : e.row}</TableCell>
                      <TableCell><code>{e.column}</code></TableCell>
                      <TableCell>{e.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {errors.length > 10 && (
              <Button size="small" onClick={() => setShowAllErrors((v) => !v)} sx={{ mt: 1 }}>
                {showAllErrors ? 'Show fewer' : `Show all ${errors.length} issues`}
              </Button>
            )}
          </Box>
        )}

        {/* Preview */}
        {isContent && contentValidation && contentValidation.contents.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Preview — {contentValidation.contents.length} Content Item{contentValidation.contents.length !== 1 ? 's' : ''}
            </Typography>
            <ContentPreviewTable contents={contentValidation.contents} />
          </Box>
        )}

        {!isContent && courseValidation && courseValidation.courses.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Preview — {courseValidation.courses.length} Course{courseValidation.courses.length !== 1 ? 's' : ''}
            </Typography>
            {courseValidation.courses.map((course, i) => (
              <CoursePreview key={i} course={course} idx={i} />
            ))}
          </Box>
        )}

        <Box display="flex" gap={1} flexWrap="wrap">
          <Button variant="outlined" startIcon={<ReplayIcon />} onClick={resetAll}>
            Upload Different File
          </Button>
          {valid && (
            <Button
              variant="contained"
              color="primary"
              onClick={isContent ? startContentImport : startCourseImport}
              disabled={!tenantConfig}
            >
              {tenantConfig ? 'Start Import' : 'Loading config...'}
            </Button>
          )}
        </Box>
      </Box>
    );
  };

  const renderImportStep = () => {
    if (importMode === 'content') {
      const contents = contentValidation?.contents ?? [];
      const done = [...contentProgressMap.values()].filter(
        (p) => p.status === 'done' || p.status === 'failed'
      ).length;
      const total = contents.length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;

      return (
        <Box>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            {isImporting && <CircularProgress size={20} />}
            <Typography variant="body2" color="text.secondary">
              {isImporting
                ? `Importing ${Math.min(done + 1, total)} of ${total}...`
                : 'Import complete — see summary below.'}
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={pct} sx={{ mb: 3, height: 8, borderRadius: 4 }} />

          {contents.map((content, i) => {
            const key = `${content.title}_${i}`;
            const prog = contentProgressMap.get(key);
            const status = prog?.status ?? 'pending';

            return (
              <Paper key={key} variant="outlined" sx={{ p: 1.5, mb: 1 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                  <Box>
                    <Typography fontWeight={500}>{content.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {content.mimeType.split('/').pop()}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    {(status === 'creating' || status === 'uploading' || status === 'publishing') && (
                      <CircularProgress size={16} />
                    )}
                    <ContentStatusBadge status={status} />
                  </Box>
                </Box>
              </Paper>
            );
          })}
        </Box>
      );
    }

    // Course mode
    const courses = courseValidation?.courses ?? [];
    const done = [...courseProgressMap.values()].filter(
      (p) => p.status === 'done' || p.status === 'failed'
    ).length;
    const total = courses.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    return (
      <Box>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          {isImporting && <CircularProgress size={20} />}
          <Typography variant="body2" color="text.secondary">
            {isImporting
              ? `Importing ${Math.min(done + 1, total)} of ${total} course${total !== 1 ? 's' : ''}...`
              : 'Import complete — see summary below.'}
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={pct} sx={{ mb: 3, height: 8, borderRadius: 4 }} />

        {courses.map((course) => {
          const prog = courseProgressMap.get(course.title);
          const status = prog?.status ?? 'pending';
          const totalContent = course.units.reduce((s, u) => s + u.contents.length, 0);
          const cp = prog?.contentProgress;

          return (
            <Paper key={course.title} variant="outlined" sx={{ p: 1.5, mb: 1 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                <Box>
                  <Typography fontWeight={500}>{course.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {course.units.length} unit{course.units.length !== 1 ? 's' : ''} &middot; {totalContent} content item{totalContent !== 1 ? 's' : ''}
                    {cp && status === 'creating_content' && ` (${cp.done}/${cp.total} content created)`}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  {status !== 'pending' && status !== 'done' && status !== 'failed' && (
                    <CircularProgress size={16} />
                  )}
                  <CourseStatusBadge status={status} />
                </Box>
              </Box>
              {cp && status === 'creating_content' && (
                <LinearProgress
                  variant="determinate"
                  value={cp.total > 0 ? Math.round((cp.done / cp.total) * 100) : 0}
                  sx={{ mt: 1, height: 4, borderRadius: 2 }}
                />
              )}
            </Paper>
          );
        })}
      </Box>
    );
  };

  const renderSummaryStep = () => {
    const basePath = process.env.NEXT_PUBLIC_WORKSPACE_ROUTES ?? '';
    const isContent = importMode === 'content';

    return (
      <Box>
        {/* Counts */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <Paper variant="outlined" sx={{ p: 2, flex: '1 1 140px', textAlign: 'center', borderColor: 'success.main' }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 36 }} />
            <Typography variant="h5" fontWeight={700} color="success.main">{successCount}</Typography>
            <Typography variant="body2">Successfully Imported</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, flex: '1 1 140px', textAlign: 'center', borderColor: failCount > 0 ? 'error.main' : 'divider' }}>
            <ErrorOutlineIcon color={failCount > 0 ? 'error' : 'disabled'} sx={{ fontSize: 36 }} />
            <Typography variant="h5" fontWeight={700} color={failCount > 0 ? 'error.main' : 'text.disabled'}>{failCount}</Typography>
            <Typography variant="body2">Failed</Typography>
          </Paper>
        </Box>

        {/* Results table */}
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{isContent ? 'Content' : 'Course'}</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Identifier</TableCell>
                <TableCell>Open</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.name}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>
                    {r.success ? (
                      <Chip label="Success" color="success" size="small" />
                    ) : (
                      <Tooltip title={r.error ?? 'Unknown error'} arrow>
                        <Chip label="Failed" color="error" size="small" />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">{r.identifier ?? '—'}</Typography>
                  </TableCell>
                  <TableCell>
                    {r.identifier && (
                      <Tooltip title={isContent ? 'Open content' : 'Open course editor'} arrow>
                        <IconButton
                          size="small"
                          onClick={() =>
                            window.open(
                              isContent
                                ? `${basePath}editor?identifier=${r.identifier}`
                                : `${basePath}collection?identifier=${r.identifier}`,
                              '_blank'
                            )
                          }
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {failCount > 0 && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>Some imports failed</AlertTitle>
            Hover the &quot;Failed&quot; chip to see the error. Fix those rows and import again.
          </Alert>
        )}

        {successCount > 0 && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {isContent
              ? `${successCount} content item${successCount !== 1 ? 's' : ''} published successfully.`
              : `${successCount} course${successCount !== 1 ? 's' : ''} sent for review successfully. A reviewer will need to approve them before they become live.`}
          </Alert>
        )}

        <Box display="flex" gap={1} flexWrap="wrap">
          <Button variant="outlined" startIcon={<ReplayIcon />} onClick={resetAll}>
            Import Another File
          </Button>
          <Button
            variant="text"
            onClick={() => {
              window.location.href = isContent
                ? `${basePath}workspace/content/publish`
                : `${basePath}workspace/content/submitted`;
            }}
          >
            {isContent ? 'View Published Content' : 'View Submitted Content'}
          </Button>
        </Box>
      </Box>
    );
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <>
      {showHeader && <WorkspaceHeader />}
      <Layout selectedKey="content-course-import" onSelect={() => {}}>
        <WorkspaceText />

        <Box
          sx={{
            background: 'linear-gradient(to bottom, white, #F8EFDA)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: theme.shadows[3],
            minHeight: '60vh',
          }}
          m={3}
        >
          {/* Header */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
            gap={1}
          >
            <Box>
              <Typography variant="h4" fontSize="18px" fontWeight={700}>
                Bulk Import Content &amp; Courses
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Upload an Excel or CSV file to create content and courses in bulk.
                Content is auto-published. Courses are sent for review.
              </Typography>
            </Box>
            {activeStep > 0 && activeStep < 3 && !isImporting && (
              <Button size="small" variant="text" startIcon={<ReplayIcon />} onClick={resetAll}>
                Start Over
              </Button>
            )}
          </Box>

          {/* Import mode toggle */}
          <Box mb={2}>
            <ToggleButtonGroup
              value={importMode}
              exclusive
              onChange={(_, val) => {
                if (val && activeStep === 0) {
                  setImportMode(val);
                  resetAll();
                }
              }}
              size="small"
              disabled={activeStep > 0}
            >
              <ToggleButton value="content" sx={{ textTransform: 'none', px: 2 }}>
                <ArticleIcon sx={{ mr: 0.5 }} fontSize="small" />
                Content Import
              </ToggleButton>
              <ToggleButton value="course" sx={{ textTransform: 'none', px: 2 }}>
                <SchoolIcon sx={{ mr: 0.5 }} fontSize="small" />
                Course Import
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Stepper */}
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Upload File</StepLabel>
              <StepContent>{renderUploadStep()}</StepContent>
            </Step>

            <Step>
              <StepLabel
                error={validation !== null && !validation.valid}
                optional={
                  validation && !validation.valid ? (
                    <Typography variant="caption" color="error">Validation errors found</Typography>
                  ) : null
                }
              >
                Validate &amp; Preview
              </StepLabel>
              <StepContent>{renderValidationStep()}</StepContent>
            </Step>

            <Step>
              <StepLabel>Import Progress</StepLabel>
              <StepContent>{renderImportStep()}</StepContent>
            </Step>

            <Step>
              <StepLabel>Summary</StepLabel>
              <StepContent>{renderSummaryStep()}</StepContent>
            </Step>
          </Stepper>
        </Box>
      </Layout>
    </>
  );
};

export default ContentCourseImportPage;
