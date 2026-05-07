import { render, screen } from '@testing-library/react';
import { CodeEditor } from './CodeEditor';

describe('CodeEditor', () => {
  it('renders editor and submit button', () => {
    render(
      <CodeEditor
        value='test code'
        language='js'
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByDisplayValue('test code')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /отправить/i })
    ).toBeInTheDocument();
  });
});
