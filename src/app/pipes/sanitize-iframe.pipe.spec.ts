import { SanitizeIframePipe } from './sanitize-iframe.pipe';

describe('SanitizeIframePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeIframePipe();
    expect(pipe).toBeTruthy();
  });
});
