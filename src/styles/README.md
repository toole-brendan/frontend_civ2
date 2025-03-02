# Frontend Styling Guide

This document outlines the styling approach and best practices for the project.

## Core Principles

1. **Consistency**: Use the established styling system to maintain visual consistency
2. **Composition**: Favor composition over configuration for more maintainable components
3. **Reusability**: Use shared styles and mixins to reduce code duplication
4. **Modularity**: Keep styles organized in a modular structure

## Styling Structure

The project uses a combination of styling approaches:

### 1. Theme System

The theme is defined in `src/theme/` and consists of:

- `index.ts` - Main theme configuration
- `colors.ts` - Color palette definitions
- `typography.ts` - Typography settings
- `components/` - Component-specific theme overrides

### 2. Styled Components

Located in `src/components/ui/styled/`, these provide consistent styling:

- `cards.ts` - Styled card components
- Additional component files as needed

### 3. Common Styles & Mixins

Found in `src/styles/`:

- `commonStyles.ts` - Reusable style objects
- `mixins.ts` - Style functions that can be applied to different components

## Best Practices

### Prefer Styled Components

```tsx
// DON'T: Use inline styles or complex sx props
<Card sx={{ 
  borderRadius: 2, 
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': { transform: 'translateY(-4px)' }
}}>
  <CardContent>Content</CardContent>
</Card>

// DO: Use styled components
import { StyledCard, StyledCardContent } from '../ui/styled/cards';

<StyledCard>
  <StyledCardContent>Content</StyledCardContent>
</StyledCard>
```

### Use Composition

```tsx
// DON'T: Create monolithic components with many props
<ComplexCard 
  title="Title" 
  subtitle="Subtitle"
  headerAction={<Button>Action</Button>}
  elevation={2}
  variant="gradient"
  footer={<Typography>Footer</Typography>}
>
  Content
</ComplexCard>

// DO: Use composition
<GradientCard elevation={2}>
  <StyledCardToolbar>
    <CardHeaderContainer>
      <StyledCardTitle>Title</StyledCardTitle>
      <StyledCardSubtitle>Subtitle</StyledCardSubtitle>
    </CardHeaderContainer>
    <Button>Action</Button>
  </StyledCardToolbar>
  <StyledCardContent>
    Content
  </StyledCardContent>
  <StyledCardFooter>
    <Typography>Footer</Typography>
  </StyledCardFooter>
</GradientCard>
```

### Leverage Theme Values

```tsx
// DON'T: Use hard-coded values
<Box sx={{ padding: '16px', color: '#333333' }}>Content</Box>

// DO: Reference theme values
<Box sx={{ padding: theme.spacing(2), color: theme.palette.text.primary }}>
  Content
</Box>
```

### Use Mixins for Common Patterns

```tsx
// DON'T: Repeat complex styles
<Box sx={{ 
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  borderRadius: 12,
  padding: '2px 8px',
  fontSize: '0.75rem',
}}>
  Verification Badge
</Box>

// DO: Use mixins
import { verificationBadgeMixin } from '../../styles/mixins';

<Box sx={verificationBadgeMixin(theme)}>
  Verification Badge
</Box>
```

## Component-Specific Guidelines

### Cards

- Use the appropriate card variant for the content type
- Prefer composition using `StyledCardToolbar`, `StyledCardContent`, etc.
- For specific needs, extend the base styled components

### Tables

- Use `TableCard` for consistent table presentation
- Customize with the provided props rather than sx overrides
- For advanced table layouts, compose using the styled components

### Buttons

- Use the theme's button styling rather than creating custom buttons
- For special button types, create a styled component that extends MUI Button
