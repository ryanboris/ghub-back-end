describe('server', () => {
    it('Should be running on test environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    });
});