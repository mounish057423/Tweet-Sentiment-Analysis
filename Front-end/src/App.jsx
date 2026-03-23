import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { analyzeSentiment, getSentimentModels } from './services/sentimentService'

function App() {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [text, setText] = useState('')
  const [loadingModels, setLoadingModels] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [result, setResult] = useState(null)

  const showLoadingBar = loadingModels || submitting

  useEffect(() => {
    async function loadModels() {
      setLoadingModels(true)
      setApiError('')

      try {
        const response = await getSentimentModels()

        if (response?.status === 1 && Array.isArray(response.models)) {
          setModels(response.models)
          return
        }

        setApiError(response?.message || 'Unable to load models.')
      } catch (error) {
        setApiError(error.message || 'Unable to load models.')
      } finally {
        setLoadingModels(false)
      }
    }

    loadModels()
  }, [])

  const selectedModelDetails = useMemo(
    () => models.find((model) => model.name === selectedModel),
    [models, selectedModel],
  )

  function validateForm() {
    const nextErrors = {}

    if (!selectedModel) {
      nextErrors.model = 'Please choose a model.'
    }

    if (!text.trim()) {
      nextErrors.text = 'Please enter text for sentiment analysis.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function getApiErrorMessage(response) {
    return (
      response?.field?.message ||
      response?.message ||
      'Unable to process your request right now.'
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setApiError('')
    setResult(null)

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const response = await analyzeSentiment({
        text: text.trim(),
        model: selectedModel,
      })

      if (response?.status === 1) {
        setResult({
          label: response.label,
          score: response.score,
        })
        return
      }

      setApiError(getApiErrorMessage(response))
    } catch (error) {
      setApiError(error.message || 'Unable to analyze sentiment.')
    } finally {
      setSubmitting(false)
    }
  }

  // AI Theme color helper for the results
  const getThemeColor = (label) => {
    const upperLabel = label?.toUpperCase() || '';
    if (upperLabel.includes('POSITIVE')) return 'var(--neon-green)';
    if (upperLabel.includes('NEGATIVE')) return 'var(--neon-red)';
    return 'var(--neon-blue)'; // Neutral
  }

  return (
    <main className="page">
      {/* Animated Background Elements to simulate Neural Nodes */}
      <div className="neural-bg"></div>

      <section className="panel">
        <div className="header-block">
          <p className="eyebrow">Neural Interface</p>
          <h1>Sentiment Analyzer</h1>
          <p className="subtext">
            Initialize model, input data sequence, and execute analysis.
          </p>
        </div>

        <div className={`loading-track ${showLoadingBar ? 'is-active' : ''}`}>
          <span className="loading-bar" />
        </div>

        <form className="sentiment-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="model" className="label">
            Select Architecture <span className="required">*</span>
          </label>
          <select
            id="model"
            className={`input ${errors.model ? 'has-error' : ''}`}
            value={selectedModel}
            onChange={(event) => {
              setSelectedModel(event.target.value)
              setErrors((current) => ({ ...current, model: undefined }))
            }}
            disabled={loadingModels || submitting}
            required
          >
            <option value="">-- Awaiting Model Selection --</option>
            {models.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>
          {errors.model ? <p className="error-text">{errors.model}</p> : null}
          {selectedModelDetails ? (
            <p className="hint-text">{selectedModelDetails.description}</p>
          ) : null}

          <label htmlFor="text" className="label">
            Data Sequence <span className="required">*</span>
          </label>
          <textarea
            id="text"
            className={`input text-area ${errors.text ? 'has-error' : ''}`}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              setErrors((current) => ({ ...current, text: undefined }))
            }}
            placeholder="Input text sequence for processing..."
            disabled={submitting}
            required
          />
          {errors.text ? <p className="error-text">{errors.text}</p> : null}

          <button
            className="submit-button"
            type="submit"
            disabled={submitting || loadingModels}
          >
            {submitting ? 'EXECUTING...' : 'INITIALIZE ANALYSIS'}
          </button>
        </form>

        {apiError ? <p className="response-error">{apiError}</p> : null}

        {result ? (
          <div 
            className="result-card" 
            role="status" 
            aria-live="polite"
            style={{ '--result-color': getThemeColor(result.label) }}
          >
            <div className="result-header">
              <span className="result-label-title">CLASSIFICATION:</span>
              <span className="result-label-value">{result.label}</span>
            </div>
            
            <div className="result-score-container">
              <div className="score-text">
                <span>CONFIDENCE METRIC</span>
                <span>{(result.score * 100).toFixed(2)}%</span>
              </div>
              <div className="score-bar-bg">
                <div 
                  className="score-bar-fill"
                  style={{ width: `${result.score * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App