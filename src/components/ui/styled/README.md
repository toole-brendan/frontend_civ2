# Styled Components System

This directory contains styled components that provide consistent styling across the application. These components follow the principles of composition over configuration and help reduce style duplication.

## Usage Examples

### Card Components

```tsx
import { 
  StyledCard, 
  GradientCard,
  OutlinedCard,
  AccentCardPrimary,
  StyledCardToolbar,
  StyledCardContent,
  StyledCardFooter
} from '../ui/styled/cards';

// Basic card
<StyledCard>
  <StyledCardContent>
    Content here
  </StyledCardContent>
</StyledCard>

// Gradient card with toolbar and footer
<GradientCard>
  <StyledCardToolbar>
    <Typography variant="h6">Card Title</Typography>
  </StyledCardToolbar>
  <StyledCardContent>
    Content here
  </StyledCardContent>
  <StyledCardFooter>
    Footer content
  </StyledCardFooter>
</GradientCard>

// Accent card
<AccentCardPrimary elevation={2}>
  <StyledCardContent>
    Content with primary accent
  </StyledCardContent>
</AccentCardPrimary>
```

## Styling Principles

1. **Composition over Configuration**
   - Each styled component does one thing well
   - Combine components to build complex UIs
   - Less props means easier maintenance

2. **Consistent Styling**
   - Styling comes from theme and shared mixins
   - Visual consistency across the application
   - All components respect light/dark mode

3. **Type Safety**
   - All components are properly typed
   - Helps prevent styling errors

## Directory Structure

- `src/components/ui/styled/` - Styled components organized by type
- `src/styles/commonStyles.ts` - Shared style objects and constants
- `src/styles/mixins.ts` - Reusable styling patterns
- `src/theme/components/` - Theme overrides for Material UI components
