import React, { useState } from 'react';
import { CodeEditor } from '../code-editor';
import { Button } from '../button';
import { Heading, Text } from '../typography';
import type { Task, TaskType } from '../../api/types';
import { checkTaskAnswer } from '../../api/coursesApi';
import styles from './TaskBlock.module.css';

type TaskBlockProps = {
  task: Task;
  language?: string;
  onSolved?: () => void;
};

function parseTestOptions(question: string): { prompt: string; options: string[] } {
  const lines = question.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) {
    return { prompt: question, options: [] };
  }
  return { prompt: lines[0], options: lines.slice(1) };
}

export const TaskBlock: React.FC<TaskBlockProps> = ({
  task,
  language = 'python',
  onSolved
}) => {
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [code, setCode] = useState('# Ваш код\n');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const runCheck = async (value: string) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await checkTaskAnswer(task.id, value);
      setOk(res.is_correct);
      setMessage(res.is_correct ? 'Верно!' : 'Неверно, попробуйте ещё раз.');
      if (res.is_correct) onSolved?.();
    } catch (e) {
      setOk(false);
      setMessage(e instanceof Error ? e.message : 'Ошибка проверки');
    } finally {
      setBusy(false);
    }
  };

  const renderByType = (taskType: TaskType) => {
    if (taskType === 'test') {
      const { prompt, options } = parseTestOptions(task.question);
      if (options.length === 0) {
        return (
          <>
            <Text>{prompt}</Text>
            <input
              className={styles.input}
              type='text'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder='Ваш ответ'
            />
            <div className={styles.actions}>
              <Button
                label={busy ? 'Проверка…' : 'Проверить'}
                sizeType='little'
                onClick={() => runCheck(answer)}
              />
            </div>
          </>
        );
      }
      return (
        <>
          <Text>{prompt}</Text>
          <div className={styles.options} role='radiogroup'>
            {options.map((opt) => (
              <label key={opt} className={styles.radio}>
                <input
                  type='radio'
                  name={`task-${task.id}`}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          <div className={styles.actions}>
            <Button
              label={busy ? 'Проверка…' : 'Проверить'}
              sizeType='little'
              onClick={() => selected && runCheck(selected)}
            />
          </div>
        </>
      );
    }

    if (taskType === 'code') {
      return (
        <>
          <Text>{task.question}</Text>
          <CodeEditor language={language} value={code} onChange={setCode} onSubmit={() => runCheck(code)} />
        </>
      );
    }

    return (
      <>
        <Text>{task.question}</Text>
        <textarea
          className={styles.textarea}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          placeholder='Введите ответ'
        />
        <div className={styles.actions}>
          <Button
            label={busy ? 'Проверка…' : 'Проверить'}
            sizeType='little'
            onClick={() => runCheck(answer)}
          />
        </div>
      </>
    );
  };

  return (
    <div className={styles.wrap} data-testid={`task-block-${task.id}`}>
      <Heading size={2}>Задание</Heading>
      {renderByType(task.task_type)}
      {message && (
        <Text style={{ marginTop: 12, color: ok ? '#00F0B1' : '#FD9E02' }}>{message}</Text>
      )}
    </div>
  );
};
