import { render, screen, fireEvent } from "@testing-library/react";
vi.mock('../../services/supabaseClient', () => ({
    supabase: {
        auth: {
            signInWithPassword: vi.fn(),
            signUp: vi.fn(),
        },
    },
}));


describe('LoginForm', () => {
    const setNeedEmailVerification = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login form by default', () => {
        render(<LoginForm setNeedEmailVerification={setNeedEmailVerification} />);
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    });

    it('switches to sign up mode', () => {
        render(<LoginForm setNeedEmailVerification={setNeedEmailVerification} />);
        fireEvent.click(screen.getByText(/sign up/i));
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
        expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    });

    it('calls supabase signInWithPassword on login', async () => {
        mockedSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });
        render(<LoginForm setNeedEmailVerification={setNeedEmailVerification} />);
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        await waitFor(() => {
            expect(mockedSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password',
            });
        });
    });

    it('shows error on login failure', async () => {
        mockedSupabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
        render(<LoginForm setNeedEmailVerification={setNeedEmailVerification} />);
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'fail@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrong' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
    });

    it('calls supabase signUp and setNeedEmailVerification on signup', async () => {
        mockedSupabase.auth.signUp.mockResolvedValue({ error: null });
        render(<LoginForm setNeedEmailVerification={setNeedEmailVerification} />);
        fireEvent.click(screen.getByText(/sign up/i));
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'new@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'newpass' } });
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        await waitFor(() => {
            expect(mockedSupabase.auth.signUp).toHaveBeenCalledWith({
                email: 'new@example.com',
                password: 'newpass',
            });
            expect(setNeedEmailVerification).toHaveBeenCalledWith(true);
        });
    });

    it('shows error on signup failure', async () => {
        mockedSupabase.auth.signUp.mockResolvedValue({ error: { message: 'Email already exists' } });
        render(<LoginForm setNeedEmailVerification={setNeedEmailVerification} />);
        fireEvent.click(screen.getByText(/sign up/i));
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'exists@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass' } });
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        await waitFor(() => {
            expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
        });
    });
});